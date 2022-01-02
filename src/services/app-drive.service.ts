import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, D2f_User_Data } from 'src/environments/googleConsole';
@Injectable({
  providedIn: 'root'
})
export class AppDriveService {
  authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
  getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)

  constructor(public http: HttpClient) { }
  // 'mimeType': 'application/vnd.google-apps.folder'
  
  createUserFolderInSharedFolder(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this.authResponse.access_token})
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files?key='+ API_KEY + '&fields=*';
    const data = {"mimeType":"application/vnd.google-apps.folder",
            // id:  'user',
            parents: [D2f_User_Data],
            originalFilename: this.getBasicProfile.nv,
            name: this.getBasicProfile.nv,
            // copyRequiresWriterPermission: true
        }
    return this.http.post(apiUrl, data, httpOptions);
  };
}
