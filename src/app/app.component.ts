import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import  * as loginApi  from '../assets/js/login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'xmxr';
  constructor(public router:Router) { }
  ngOnInit(): void {

    // loginApi.LoginGoogleModule.loginGoogle('xyz')
    // loginApi.LoginGoogleModule.intialInit('test')
  }
}
