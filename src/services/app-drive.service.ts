import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY, categoryUnqueCode, D2f_User_Data } from 'src/environments/googleConsole';
@Injectable({
  providedIn: 'root'
})
export class AppDriveService {
  authResponse: any = JSON.parse(localStorage.getItem('getAuthResponse') as any)
  getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)

  constructor(public http: HttpClient) { }
  // 'mimeType': 'application/vnd.google-apps.folder'
  
  createUserFolderInSharedFolder() {
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

  deletePermission(field:string,permissionId:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this.authResponse.access_token})
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' +field+'/permissions/'+permissionId+'?key='+API_KEY ;
  
    return this.http.delete(apiUrl,httpOptions);
  };

  fetchUserFolder(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this.authResponse.access_token}),
      // params: {q:`name=${this.getBasicProfile.nv}`}
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files"+"?key="+API_KEY+"&q=name='"+ this.getBasicProfile.nv+"'"+ "&fields=*";
    console.log(apiUrl,"apiUrl")
  
    return this.http.get(apiUrl,httpOptions);
  }

  createCategory(parentId:string,categoryName:string){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json','Authorization': 'Bearer '+ this.authResponse.access_token})
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

  uploadCategoryProfile(file: any,parentId:string,parentName:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    var metadata = {
      'name': `${parentName}.${file.name.split('.')[1]}`,
      'parents': [parentId], // Folder ID at Google Drive
      'mimeType': file.type
    };
    var form = new FormData();
    form.append('metadata',  new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart'
    return this.http.post(apiUrl, form, httpOptions);
  }

}
