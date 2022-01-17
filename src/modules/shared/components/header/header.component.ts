import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDriveService } from 'src/services/app-drive.service';
import { LoginService } from 'src/services/login.service';
import { SharedService } from 'src/services/shared.service';
import * as logoutApi from '../../../../assets/js/logout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  opened = false;
  constructor(
    public router: Router,
    public sharedService: SharedService,public loginService: LoginService,
    public appDriveService:AppDriveService
    ) { }

  ngOnInit(): void {
  }

  signOut() {
    // logoutApi.LogoutGoogleModule.logoutGoogle('xyz');
    this.loginService.handleSignoutClick()
    setTimeout(() => {
      this.router.navigate([''])
      this.isLoggedIn = false;
    }, 1000);
  }
  navigateCat(){
    this.appDriveService.getAuthResponse()
    this.router.navigate(['/categories'])
  }
  loggedOut() {
  }

 
}
