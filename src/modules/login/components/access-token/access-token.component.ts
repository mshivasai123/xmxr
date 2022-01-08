import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppDriveService } from 'src/services/app-drive.service';

@Component({
  selector: 'app-access-token',
  templateUrl: './access-token.component.html',
  styleUrls: ['./access-token.component.scss']
})
export class AccessTokenComponent implements OnInit {
  accessToken = ""
  constructor(public router: Router,public appDriveService:AppDriveService) { }

  ngOnInit(): void {
  }

  goToAccess(){
    this.appDriveService.getAuthResponse()
    if(this.accessToken){
      if(this.accessToken.includes('it@m')){
        this.router.navigateByUrl('/categories/mediaview', { state: {id: this.accessToken} })
      }else if(this.accessToken.includes('c@TG')){
        const access = this.accessToken.split('c@TG')
        this.router.navigateByUrl('/categories/items', { state: {id:access[0],name: access[1]}})
      }
    } else {
      this.router.navigate([''])
    }
  }

}
