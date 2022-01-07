import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'xmxr';
  constructor(public router:Router,public loginService: LoginService) { }
  ngOnInit(): void {
    this.loginService.handleClientLoad()
  }
}
