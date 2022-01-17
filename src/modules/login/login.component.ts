import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import  * as loginApi  from '../../assets/js/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router:Router,public loginService: LoginService) { }

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
  }

  // logCategories(){
  //   this.router.navigate(['/categories'])
  // }
}
