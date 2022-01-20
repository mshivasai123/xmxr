import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  MatSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  userData: any;

  constructor(
    private _snackBar: MatSnackBar
  ) { 
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

  openSnackBar(message: any, className: string) {
    // let msg;
    // if(className === 'success-message') {
    //   const icon = '<mat-icon>info</mat-icon>';
    //   msg = `${icon} ${message}`;
    // } else {
    //   msg = message;
    // }
    this._snackBar.openFromComponent(message, {
      horizontalPosition: "center",
      verticalPosition: "top",
      duration : 5000,
      panelClass : className
    });
  }

}
