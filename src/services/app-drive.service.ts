import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_KEY, D2f_User_Data } from 'src/environments/googleConsole';

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
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files?key=' + API_KEY + '&fields=*';
    const data = {
      "mimeType": "application/vnd.google-apps.folder",
      // id:  'user',
      parents: [D2f_User_Data],
      originalFilename: this.getBasicProfile.Email,
      name: this.getBasicProfile.Email,
      // copyRequiresWriterPermission: true
    }
    return this.http.post(apiUrl, data, httpOptions);
  };

  deletePermission(field: string, permissionId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' + field + '/permissions/' + permissionId + '?key=' + API_KEY;

    return this.http.delete(apiUrl, httpOptions);
  };

  fetchUserFolder() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files" + "?key=" + API_KEY + "&q=name='" + this.getBasicProfile.Email + "'&parents='" + D2f_User_Data + "' and trashed=false&fields=*";
    return this.http.get(apiUrl, httpOptions);
  }

  fetchAllUserFolder(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files" + "?key=" + API_KEY + "&q=parents='" + D2f_User_Data + "' and trashed=false&fields=*";
    return this.http.get(apiUrl, httpOptions);
  }

  createCategory(parentId: string, categoryName: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    let uuid = 'CAT'+Date.now()//this.generateID()//UUID.UUID();
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files?key=' + API_KEY + '&fields=*';
    const data = {
      "mimeType": "application/vnd.google-apps.folder",
      // id:  'user',
      parents: [parentId],
      name: uuid + '_' + categoryName,
    }
    return this.http.post(apiUrl, data, httpOptions);
  }

  createPermission(fieldId: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };

    var apiUrl = "https://www.googleapis.com/drive/v3/files/" + fieldId + "/permissions"
    const data = {
      role: "writer",
      type: "anyone"
    }
    return this.http.post(apiUrl, data, httpOptions);
  }

  uploadCategoryProfile(file: any, parentId: string, parentName: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let extension = file.name.split('.')
    var metadata = {
      'name': `${parentName}.${extension[extension.length - 1 ?? '']}`,
      'parents': [parentId], // Folder ID at Google Drive
      'mimeType': file.type
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=*'
    return this.http.post(apiUrl, form, httpOptions);
  }

  updateCategoryProfile(name: any, category: any, file?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let metadata
    let form = new FormData();
    if (file) {
      let extension = file.name.split('.')
      metadata = {
        'name':`${category.name.split('_')[0]}_${name}.${extension[extension.length - 1]}`,
        'mimeType': file.type
      };
    } else {
      let extension = category.photoName.split('.')
      metadata = {
        'name': `${category.name.split('_')[0]}_${name}.${extension[extension.length - 1]}`
      };
    }
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    if (file) {
      form.append('file', file);
    }
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files/' + category.photoId + '?uploadType=multipart'
    return this.http.patch(apiUrl, form, httpOptions);
  }

  updateCategory(categoryName: any, category: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    // let uuid = UUID.UUID();
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' + category.id;
    const data = {
      name: category.name.split('_')[0] + '_' + categoryName
    }
    return this.http.patch(apiUrl, data, httpOptions);
  }

  getListOfCategoriesByParentId(parentId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
      // params: {q:`name=${this.getBasicProfile.Email}`}
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files" + "?key=" + API_KEY + "&q=parents='" + parentId + "' and trashed=false";//+ "&fields=*"

    return this.http.get(apiUrl, httpOptions);
  }

  getCategoryProfile(catName: string, parentId: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
      // params: {q:`name=${this.getBasicProfile.Email}`}
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files" + "?key=" + API_KEY + "&q=parents='" + parentId + "' and name contains '" + catName + "' and trashed=false" + "&fields=*";//+ "&fields=*"

    return this.http.get(apiUrl, httpOptions);
  }

  deleteCategory(catId: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' + catId + '?key=' + API_KEY;

    return this.http.delete(apiUrl, httpOptions);
  }

  createitem(file: any, parentId: any, itemName: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let extension = file.name.split('.')
    let uuid = 'ITM'+Date.now()//this.generateID();
    var metadata = {
      'name': `${uuid}_${itemName}.${extension[extension.length - 1]}`,
      'parents': [parentId], // Folder ID at Google Drive
      'mimeType': file.type
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=*'
    return this.http.post(apiUrl, form, httpOptions);
  }

  createMediaFile(file: any, parentId: any, name: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let extension = file.name.split('.')
    let itemName = name.split('.')[0]
    var metadata = {
      'name': `${itemName}model.${extension[extension.length - 1]}` ,
      'parents': [parentId], // Folder ID at Google Drive
      'mimeType': file.type
    };
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', file);
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=*'
    return this.http.post(apiUrl, form, httpOptions);
  }

  updateMedia( item: any,file: any,newItem:any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let metadata
    let itemName = newItem.name.split('.')[0]
    if (file) {
      let extension = file.name.split('.')
      metadata = {
        'name':`${itemName}model.${extension[extension.length - 1]}`,
        'mimeType': file.type
      };
    } else {
      let extension = item.mediaFileName.split('.')
      metadata = {
        'name': `${itemName}model.${extension[extension.length - 1]}`
      };
    }
    let form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    if(file){
      form.append('file', file);
    }
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files/' + item.mediaId + '?uploadType=multipart'
    return this.http.patch(apiUrl, form, httpOptions);
  }

  upDateItem(name: any, item: any, file?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.authResponse.access_token
      })
    };
    let uuid = item.name.split('_')[0];
    let metadata
    if (file) {
      let extension = file.name.split('.')
      metadata = {
        'name': `${uuid}_${name}.${extension[extension.length - 1 ?? '']}`,
        'mimeType': file.type
      };
    } else {
      let extension = item.name.split('.')
      metadata = {
        'name': `${uuid}_${name}.${extension[extension.length - 1 ?? '']}`,
      };
    }

    let form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    if (file) {
      form.append('file', file);
    }
    var apiUrl = 'https://www.googleapis.com/upload/drive/v3/files/' + item.id + '?uploadType=multipart'
    return this.http.patch(apiUrl, form, httpOptions);
  }

  getListOfItemsByCatgryId(state: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
      // params: {q:`name=${this.getBasicProfile.Email}`}
    };
    // console.log(data, "data")
    var apiUrl = "https://www.googleapis.com/drive/v3/files" + "?key=" + API_KEY + "&q=parents='" + state.id + "' and trashed=false&fields=*";//+ "&fields=*"

    return this.http.get(apiUrl, httpOptions);
  }

  deleteItem(catId: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token })
    };
    // console.log(data, "data")
    var apiUrl = 'https://www.googleapis.com/drive/v3/files/' + catId + '?key=' + API_KEY;

    return this.http.delete(apiUrl, httpOptions);
  }

  getFileById(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
    };
    var apiUrl = "https://www.googleapis.com/drive/v3/files/" + id + "?q=trashed=false&fields=*";//+ "&fields=*"
    return this.http.get(apiUrl, httpOptions);
  }

  getItemsListByToken(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
    };
    var apiUrl = "https://www.googleapis.com/drive/v2/files/" + id + "/children?q=trashed=false&fields=*";
    return this.http.get(apiUrl, httpOptions);
  }

  getItemByItemId(id: any) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.authResponse.access_token }),
    };
    var apiUrl = "https://www.googleapis.com/drive/v3/files/" + id + "?q=trashed=false&fields=*";
    return this.http.get(apiUrl, httpOptions);
  }

  getAuthResponse() {
    this.authResponse = JSON.parse(localStorage.getItem('getAuthResponse') as any)
    this.getBasicProfile = JSON.parse(localStorage.getItem('getBasicProfile') as any)
  }



  generateID() {
    var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var ID_LENGTH = 8;
    var rtn = '';
    for (var i = 0; i < ID_LENGTH; i++) {
      rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
  }




}
