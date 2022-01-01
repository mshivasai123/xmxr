import { Component, OnInit } from '@angular/core';
import  * as loginApi  from '../../assets/js/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    loginApi.LoginGoogleModule.loginGoogle('xyz')
    // loginApi.LoginGoogleModule.intialInit('test')
  }

  login(){
  }
}
