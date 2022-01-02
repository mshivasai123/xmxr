import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  * as loginApi  from '../../assets/js/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
    // loginApi.LoginGoogleModule.intialInit('test')
  }

  ngAfterViewInit(): void {
    loginApi.LoginGoogleModule.loginGoogle('xyz')
  }

  login(){
  }

  logCategories(){
    this.router.navigate(['/categories'])
  }
}
