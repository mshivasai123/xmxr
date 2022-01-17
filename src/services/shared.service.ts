import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userData: any;

  constructor() { 
    this.isUserLoggedIn();
  }

  isUserLoggedIn() {
    this.userData = localStorage.getItem('getBasicProfile') ? JSON.parse(localStorage.getItem('getBasicProfile') as string) : '' ;
    return !this.userData;
  }

  getUserImage() {
    let userImage = this.userData?.ImageURL ? this.userData?.ImageURL : '';
    return userImage;
  }

  getUserName() {
    let userName = this.userData?.FullName ? this.userData?.FullName : 'User';
    return userName;
  }

  getUserEmail() {
    let userName = this.userData?.Email ? this.userData?.Email : '';
    return userName;
  }

  checkAccessTokenUser() {
    let permission = sessionStorage.getItem("isAccessToken");
    return !permission;
  }

}
