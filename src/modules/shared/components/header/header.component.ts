import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as logoutApi from '../../../../assets/js/logout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  signOut() {
    logoutApi.LogoutGoogleModule.logoutGoogle('xyz')
  }
  loggedOut() {
    this.router.navigate([''])
  }
}
