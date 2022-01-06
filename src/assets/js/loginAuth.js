import * as apiKeys from '../../environments/googleConsole'
 function listFiles() {
    gapi.client.drive.files.list({
      'pageSize': 10,
      'fields': "nextPageToken, files(id, name)"
    }).then(function(response) {
      appendPre('Files:');
      var files = response.result.files;
      console.log(files)
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

  var CLIENT_ID = apiKeys.CLIENT_ID;
  var API_KEY = apiKeys.API_KEY;

   // Array of API discovery doc URLs for APIs used by the quickstart
   var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];

   // Authorization scopes required by the API; multiple scopes can be
   // included, separated by spaces.
   var SCOPES = 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata';

//    var signoutButton = document.getElementById('signout_button');
   /**
    *  On load, called to load the auth2 library and API client library.
    */
   export function handleClientLoad() {
     gapi.load('client:auth2', initClient);
   }

   /**
    *  Initializes the API client library and sets up sign-in state
    *  listeners.
    */
   function initClient() {
     gapi.client.init({
       apiKey: API_KEY,
       clientId: CLIENT_ID,
       discoveryDocs: DISCOVERY_DOCS,
       scope: SCOPES
     }).then(function (data) {
         console.log(data)
         listFiles()
     })
    }