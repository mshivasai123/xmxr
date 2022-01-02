import { Component, OnInit } from '@angular/core';
import { AppDriveService } from 'src/services/app-drive.service';
import  * as loginApi  from '../../assets/js/login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public appDriveService: AppDriveService) { }

  ngOnInit(): void {
    loginApi.LoginGoogleModule.loginGoogle('xyz')
    // loginApi.LoginGoogleModule.intialInit('test')
  }

  login(){
  }
  createUserFolder(){
    this.appDriveService.createUserFolderInSharedFolder().subscribe((response)=>{
      console.log(response,"res")
    },(err)=>{
      console.log(err)
    })
  }
}
