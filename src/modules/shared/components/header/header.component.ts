import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppDriveService } from 'src/services/app-drive.service';
import { LoginService } from 'src/services/login.service';
import { SharedService } from 'src/services/shared.service';
import * as logoutApi from '../../../../assets/js/logout';
import { CommonDialogueComponent } from '../common-dialogue/common-dialogue.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  opened = false;
  constructor(
    private dialog: MatDialog,
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

  openDialog(data: string) {
     this.dialog.open(CommonDialogueComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: ['xmxr-model','header-dialogue'],
      data : {title : data}
    });
  }

 
}
