import { Component, OnInit } from '@angular/core';
import  * as logoutApi  from '../../../../assets/js/logout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  signOut(){
    logoutApi.LogoutGoogleModule.logoutGoogle('xyz')
  }
}
