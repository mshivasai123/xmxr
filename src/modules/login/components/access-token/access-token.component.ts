import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDriveService } from 'src/services/app-drive.service';
import { LoginService } from 'src/services/login.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.scss']
})
export class AccessTokenComponent implements OnInit {
  accessToken = ""
  constructor(
    public router: Router,
    public appDriveService:AppDriveService,
    public loginService:LoginService,
    public dialogRef: MatDialogRef<AccessTokenComponent>) { }

  ngOnInit(): void {
  }

  goToAccess(){
    this.loginService.handleAuthClick(true)
  }

  navigateAccess(){
    this.appDriveService.getAuthResponse()
    if(this.accessToken){
      if(this.accessToken.includes('it@m')){
        this.dialogRef.close()
        this.router.navigateByUrl('/categories/mediaview', { state: {id: this.accessToken} })
      }else if(this.accessToken.includes('c@TG')){
        this.dialogRef.close()
        const access = this.accessToken.split('c@TG')
        this.router.navigateByUrl('/categories/items', { state: {id:access[0],name: access[1]}})
      }
    } else {
      this.router.navigate([''])
    }
  }

}
