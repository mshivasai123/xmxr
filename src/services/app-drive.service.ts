import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppDriveService {

  constructor(public http: HttpClient) { }
  // 'mimeType': 'application/vnd.google-apps.folder'


}
