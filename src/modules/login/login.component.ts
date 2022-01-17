import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import  * as loginApi  from '../../assets/js/login';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';

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
