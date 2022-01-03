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
    let userImage = this.userData?.mN ? this.userData?.mN : '';
    return userImage;
  }

  getUserName() {
    let userName = this.userData?.qf ? this.userData?.qf : 'User';
    return userName;
  }

}
