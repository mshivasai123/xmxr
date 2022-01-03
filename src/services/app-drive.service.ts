import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, categoryUnqueCode, D2f_User_Data } from 'src/environments/googleConsole';
@Injectable({
  providedIn: 'root'
})
export class AppDriveService {
  

  constructor(public http: HttpClient) { }
  // 'mimeType': 'application/vnd.google-apps.folder'
  
  createUserFolderInSharedFolder() {
   const authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
  const getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ authResponse.access_token})
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files?key='+ API_KEY + '&fields=*';
    const data = {"mimeType":"application/vnd.google-apps.folder",
            // id:  'user',
            parents: [D2f_User_Data],
            originalFilename: getBasicProfile.nv,
            name: getBasicProfile.nv,
            // copyRequiresWriterPermission: true
        }
    return this.http.post(apiUrl, data, httpOptions);
  };

  deletePermission(field:string,permissionId:string){
    const authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
    const getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ authResponse.access_token})
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' +field+'/permissions/'+permissionId+'?key='+API_KEY ;
  
    return this.http.delete(apiUrl,httpOptions);
  };

  fetchUserFolder(){
    const authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
    const getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ authResponse.access_token}),
      // params: {q:`name=${getBasicProfile.nv}`}
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files"+"?key="+API_KEY+"&q=name='"+ getBasicProfile.nv+"'"+ "&fields=*";
    console.log(apiUrl,"apiUrl")
  
    return this.http.get(apiUrl,httpOptions);
  }

  createCategory(parentId:string,categoryName:string){
    const authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
    const getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ authResponse.access_token})
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files?key='+ API_KEY + '&fields=*';
    const data = {"mimeType":"application/vnd.google-apps.folder",
            // id:  'user',
            parents: [parentId],
            originalFilename: categoryUnqueCode+categoryName,
            name: categoryUnqueCode+categoryName,
        }
    return this.http.post(apiUrl, data, httpOptions);
  }

}
