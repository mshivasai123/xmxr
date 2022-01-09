import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { AppDemoModels } from 'src/environments/googleConsole';
import { AppDriveService } from 'src/services/app-drive.service';

@Component({
  selector: 'app-demo-modals',
  templateUrl: './demo-modals.component.html',
  styleUrls: ['./demo-modals.component.scss']
})
export class DemoModalsComponent implements OnInit {
  itemsList:any= []
  constructor(public appDriveService: AppDriveService) { }

  ngOnInit(): void {
    this.appDriveService.getItemsListByToken(AppDemoModels).subscribe((res:any)=>{
      if(res.items.length){
        const requestArray = res.items.map((val:any)=> this.appDriveService.getItemByItemId(val.id))
        forkJoin(requestArray).subscribe((results:any) => {
          console.log(results,"forkJoin");
          this.itemsList = results
        });
      }
    })
  }

}
