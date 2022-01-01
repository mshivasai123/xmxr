import * as apiKeys from '../../environments/googleConsole'
// import * as $ from 'jquery';
function LogoutGoogle() { }
LogoutGoogle.prototype.logoutGoogle = function (options) {
  // Client ID and API key from the Developer Console
  var clientId = apiKeys.CLIENT_ID
  var apiKey = apiKeys.API_KEY

  // Array of API discovery doc URLs for APIs used by the quickstart
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  var SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
  /**
   *  Sign out the user upon button click.
   */
  (function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
    // gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse()
    // localStorage.clear()
    // sessionStorage.clear()
  })()
  

}

var LogoutGoogleModule = new LogoutGoogle();
export {
    LogoutGoogleModule
};