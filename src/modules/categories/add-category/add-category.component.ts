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
  newCategory:any
  file:any
  fileName= ""
  constructor(  public dialogRef: MatDialogRef<AddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, public appDriveService: AppDriveService) {
      // this.dialogRef.close(true);
     }

  ngOnInit(): void {
    console.log(this.data,"data to modal")
  }
  save(){
    if(this.data?.isEdit){
      this.fileName = this.data.category.photoName
      // this.categoryName = this.data.category.name
      this.editCategory()
    }else{
      this.createCategory()
    }
  }
  createCategory(){
   if(this.data.parentId){
    this.appDriveService.createCategory(this.data.parentId,this.categoryName).subscribe((res:any)=>{
      console.log(res,"added catregory")
      this.newCategory = res;
      if(this.file){
        this.appDriveService.uploadCategoryProfile(this.file,res.id,res.name).subscribe((profile:any)=>{
          console.log(profile,"profiledata")
          this.newCategory['profilePhoto'] = profile.thumbnailLink
          this.newCategory['photoName'] = profile.name;
          this.newCategory['photoId'] = profile.id;
          this.dialogRef.close(this.newCategory);
        })
      }
    })
   }
  }

  editCategory(){
    if(this.categoryName && (this.categoryName != this.data.category.name)){
      this.appDriveService.updateCategory(this.categoryName,this.data.category).subscribe((res:any)=>{
        console.log(res,"added catregory")
        this.newCategory = res;
        if(this.file){
            this.updateProfile(res.name,this.file)
        }else{
          this.updateProfile(res.name)
        }
       
  
      })
     }else if(this.file){
      this.updateProfile(this.categoryName,this.file)
     }
  }


  updateProfile(name:any,file?:any){
     this.appDriveService.updateCategoryProfile(name,this.data.category,file).subscribe((profile:any)=>{
          console.log(profile,"profiledata")
          this.dialogRef.close(true);
          // this.newCategory['profilePhoto'] = profile.thumbnailLink
          // this.dialogRef.close(this.newCategory);
        })
  }
  

  profileUpload(event:any){
     console.log(event)
     this.file = event.target.files[0]
     this.fileName = this.file.name
  }

}
