import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { googleApis } from 'src/assets/js/login';
import * as apiKeys from '../environments/googleConsole'
declare var gapi: any;
let that: any
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // Client ID and API key from the Developer Console
  CLIENT_ID = apiKeys.CLIENT_ID;
  API_KEY = apiKeys.API_KEY;//API_KEY

  // gapi = googleApis
  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata';
  constructor(public router: Router) { }


  // authorizeButton = document.getElementById('authorize_button');
  //    var signoutButton = document.getElementById('signout_button');
  //  handleClientLoad()
  /**
   *  On load, called to load the auth2 library and API client library.
   */
  handleClientLoad() {
    console.log(this, "this")
    that = this
    gapi.load('client:auth2', this.initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  initClient() {
    console.log(apiKeys.API_KEY, " apiKeys.API_KEY")
    gapi.client.init({
      apiKey: apiKeys.API_KEY,
      clientId: apiKeys.CLIENT_ID,
      discoveryDocs: apiKeys.DISCOVERY_DOCS,
      scope: apiKeys.SCOPES
    }).then((data: any) => {
      console.log(data)
      // Listen for sign-in state changes.
      //  console.log(that,"that",this,"this")
      gapi.auth2.getAuthInstance().isSignedIn.listen(that.updateSigninStatus);

      // Handle the initial sign-in state.
      that.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      //  this.authorizeButton.onclick = handleAuthClick;
      //    signoutButton.onclick = handleSignoutClick;
    }, (error: any) => {
      //  appendPre(JSON.stringify(error, null, 2));
    });
  }

  /**
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  updateSigninStatus(isSignedIn: any) {
    if (isSignedIn) {
      //    authorizeButton.style.display = 'none';
      //    signoutButton.style.display = 'block';
      console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(), "authres")
      console.log(gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile(), "authres")
      let profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile()
      let basicProfile = {
        'ID': profile.getId(),
        'FullName': profile.getName(),
        'GivenName': profile.getGivenName(),
        'FamilyName': profile.getFamilyName(),
        'ImageURL': profile.getImageUrl(),
        'Email': profile.getEmail()
      }
      localStorage.setItem('getBasicProfile', JSON.stringify(basicProfile))
      localStorage.setItem('getAuthResponse', JSON.stringify(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()))
      //  that.router.navigate(['/categories'])
      if(sessionStorage.getItem("isAccessToken") == "true"){
        document.getElementById('navtoken')?.click();
      }else{
        document.getElementById('navCat')?.click();
      }
      //    document.getElementById()
      that.listFiles();
    } else {
      //    authorizeButton.style.display = 'block';
      //    signoutButton.style.display = 'none';
    }
  }

  /**
   *  Sign in the user upon button click.
   */
  handleAuthClick(isAccessToken: boolean) {
    if (isAccessToken) {
      sessionStorage.setItem("isAccessToken", "true")
    } else {
      sessionStorage.removeItem("isAccessToken")
    }
    gapi.auth2.getAuthInstance().signIn();
  }

  /**
   *  Sign out the user upon button click.
   */
  handleSignoutClick() {
    gapi.auth2.getAuthInstance().signOut();
    localStorage.clear()
    sessionStorage.clear()
    //  console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(),"authres")
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node. Used to display the results of the API call.
   *
   * @param {string} message Text to be placed in pre element.
   */
  appendPre(message: any) {
    //  var pre = document.getElementById('content');
    //  var textContent = document.createTextNode(message + '\n');
    //  pre.appendChild(textContent);
  }

  /**
   * Print files.
   */
  listFiles() {
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then((response: any) => {
      //  appendPre('Files:');
      var files = response.result.files;
      //    if (files && files.length > 0) {
      //      for (var i = 0; i < files.length; i++) {
      //        var file = files[i];
      //        appendPre(file.name + ' (' + file.id + ')');
      //      }
      //    } else {
      //      appendPre('No files found.');
      //    }
    });
  }

  isAuthorized(){
   return gapi.auth2.getAuthInstance().isSignedIn.get()
  }
}
