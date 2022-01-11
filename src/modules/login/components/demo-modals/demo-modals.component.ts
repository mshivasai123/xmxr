import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AppDemoModels } from 'src/environments/googleConsole';
import { AppDriveService } from 'src/services/app-drive.service';

@Component({
  selector: 'app-demo-modals',
  templateUrl: './demo-modals.component.html',
  styleUrls: ['./demo-modals.component.scss']
})
export class DemoModalsComponent implements OnInit {
  itemsList:any= [
    {
      "name": "test1",
      "url":"https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf"
    },
    {
      "name": "test2",
      "url":"https://file-examples-com.github.io/uploads/2017/10/file-example_PDF_500_kB.pdf"
    }
  ]
  constructor(public appDriveService: AppDriveService,public router:Router) { }

  ngOnInit(): void {
    // this.appDriveService.getItemsListByToken(AppDemoModels).subscribe((res:any)=>{
    //   if(res.items.length){
    //     const requestArray = res.items.map((val:any)=> this.appDriveService.getItemByItemId(val.id))
    //     forkJoin(requestArray).subscribe((results:any) => {
    //       console.log(results,"forkJoin");
    //       this.itemsList = results
    //     });
    //   }
    // })
  }

  naviagteToPreview(item: any){
    this.router.navigateByUrl('/view-modal', { state: {url: item.url,type: "google" } })
  }

}
