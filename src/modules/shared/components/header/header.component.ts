import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import * as logoutApi from '../../../../assets/js/logout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;

  constructor(
    public router: Router,
    public sharedService: SharedService
    ) { }

  ngOnInit(): void {
  }

  signOut() {
    logoutApi.LogoutGoogleModule.logoutGoogle('xyz');
    this.isLoggedIn = false;
  }
  loggedOut() {
    this.router.navigate([''])
  }
}
