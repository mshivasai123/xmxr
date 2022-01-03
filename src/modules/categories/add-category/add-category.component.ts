import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  // dialogData: DialogData;
  public categoryName:string = ''
  file:any
  constructor(  public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public appDriveService: AppDriveService) {
      // this.dialogRef.close(true);
     }

  ngOnInit(): void {
  }

  createCategory(){
   if(this.data.parentId){
    this.appDriveService.createCategory(this.data.parentId,this.categoryName).subscribe((res:any)=>{
      console.log(res,"added catregory")
      this.appDriveService.uploadCategoryProfile(this.file,res.id,res.name).subscribe((profile)=>{
        console.log(profile,"profiledata")
      })

    })
   }
  }

  profileUpload(event:any){
     console.log(event)
     this.file = event.target.files[0]
  }

}
