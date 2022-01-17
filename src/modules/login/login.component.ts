import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import  * as loginApi  from '../../assets/js/login';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';

@Component({
  selector: 'video-dialog',
  template: `
  <div class="p-3">
  <div class="d-flex mb-4 justify-content-between align-items-center">
    <h5 class="mb-0 me-4">How D2F Works</h5>
    <span class="material-icons cursor-pointer" (click)="dialogRef.close()">
      close
    </span>
    </div>
    <video class="w-100" autoplay controls>
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      Your browser does not support video.
    </video>
  </div>
  `,
})
export class VideoDialog {
  constructor(
    public dialogRef: MatDialogRef<VideoDialog>
  ) { }

  closeModel(del:boolean) {
    this.dialogRef.close(del);
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(
    public router:Router,
    public loginService: LoginService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    if(this.loginService.isAuthorized()){
      this.router.navigate(['/categories'])
    }
    // this.loginService.handleClientLoad()
    // loginApi.LoginGoogleModule.intialInit('test')
  }

  ngAfterViewInit(): void {
    // loginApi.LoginGoogleModule.loginGoogle('xyz')
  }

  login(){
  }

  loginGoogle(){
   this.loginService.handleAuthClick(false)
  }

  loginWithAccessToken(){
    const dialogRef = this.dialog.open(AccessTokenComponent, {
      width: '350px',
      panelClass : 'xmxr-model'
    });
  }

  playVideo() {
    this.dialog.open(VideoDialog, {
      width: '700px',
      panelClass : 'xmxr-model'
    });
  }

  testModel() {
    const dialogRef = this.dialog.open(TestModalComponent, {
      width: '500px',
      panelClass : 'xmxr-model'
    });
  }

  // logCategories(){
  //   this.router.navigate(['/categories'])
  // }
}
