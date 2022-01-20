import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';
import {DomSanitizer} from '@angular/platform-browser';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AddInterceptService } from 'src/services/add-intercept.service';
import { SharedService } from 'src/services/shared.service';

@Component({
  template: `
    <div class="success-message d-flex align-items-center justify-content-center">
      <mat-icon class="message-text f-15 me-2">check</mat-icon>
      <span class="fw-bold message-text me-2">
        Category Name
      </span>
      <span class="message-text">
        Added Successfully
      </span>
    </div>
  `,
})
export class SnackbarMessageComponent {
  constructor() { }
}

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  // providers: [AddInterceptService,{ provide: HTTP_INTERCEPTORS, useClass: AddInterceptService, multi: true }]
})
export class AddCategoryComponent implements OnInit {
  // dialogData: DialogData;
  public categoryName:string = ''
  newCategory:any
  file:any
  imageUrl = 'assets/images/placeholder.png';
  fileName= ""
  objectURL:any= ""
  intialCategoryName = "";
  showLoader = false;
  constructor(  public dialogRef: MatDialogRef<AddCategoryComponent>,private sanitizer:DomSanitizer,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data:any, public appDriveService: AppDriveService) {
      // this.dialogRef.close(true);
     }

  ngOnInit(): void {
    console.log(this.data,"data to modal");
    if(this.data?.isEdit){
      this.categoryName = JSON.parse(JSON.stringify(this.data.category.name.split('_')[1]))
      this.intialCategoryName = JSON.parse(JSON.stringify(this.data.category.name.split('_')[1]))
      this.fileName = this.categoryName + '.' + this.data.category.photoOrginalName.split('.')[1]
      this.objectURL = this.data.category.profilePhoto
    }
  }
  save(){
    if(this.data?.isEdit){
      // this.fileName = this.data.category.photoName
      // this.categoryName = this.data.category.name
      this.editCategory()
    }else{
      this.createCategory()
    }
  }
  createCategory(){
   if(this.data.parentId){
    this.showLoader = true;
    this.appDriveService.createCategory(this.data.parentId,this.categoryName).subscribe((res:any)=>{
      console.log(res,"added catregory")
      this.showLoader = false;
      if(!this.file){
        this.sharedService.openSnackBar(SnackbarMessageComponent,'success-message')
      }
      this.appDriveService.createPermission(res.id).subscribe((permision)=>{
        console.log(permision,"permision");
      })
      this.newCategory = res;
      if(this.file){
    this.showLoader = true;
        this.appDriveService.uploadCategoryProfile(this.file,res.id,res.name).subscribe((profile:any)=>{
          console.log(profile,"profiledata")
          this.newCategory['profilePhoto'] = profile.webContentLink
          this.newCategory['photoName'] = profile.name;
          this.newCategory['photoId'] = profile.id;
          this.newCategory['photoOrginalName']=profile.originalFilename
          this.showLoader = false;
          this.sharedService.openSnackBar(SnackbarMessageComponent,'success-message')
          this.dialogRef.close(this.newCategory);
        },(err)=>{
          this.showLoader = false;
        })
      }
    },(err)=>{
      this.showLoader = false;
    })
   }
  }

  editCategory(){
    if(this.categoryName && (this.categoryName != this.intialCategoryName)){
    this.showLoader = true;
      this.appDriveService.updateCategory(this.categoryName,this.data.category).subscribe((res:any)=>{
        console.log(res,"added catregory")
        this.newCategory = res;
        this.showLoader = false;
        if(this.file){
            this.updateProfile(this.categoryName,this.file)
        }else{
          this.updateProfile(this.categoryName)
        }
      },(err)=>{
        this.showLoader = false;
      })
     }else if(this.file){
      this.showLoader = true;
      this.updateProfile(this.categoryName,this.file)
     }
  }


  updateProfile(name:any,file?:any){
     this.appDriveService.updateCategoryProfile(name,this.data.category,file).subscribe((profile:any)=>{
          console.log(profile,"profiledata")
          this.showLoader = false;
          this.dialogRef.close(true);
          // this.newCategory['profilePhoto'] = profile.thumbnailLink
          // this.dialogRef.close(this.newCategory);
        },(err)=>{
          this.showLoader = false;
        })
  }
  

  profileUpload(event:any){
     console.log(event)
     this.file = event.target.files[0]
     this.fileName = this.categoryName + '.'+ this.file.name.split('.')[1]
     if (this.objectURL) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(this.objectURL);  
    }
  
    const fileD = this.file;
    this.objectURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
    console.log(this.objectURL,"this.objectURL")
  }

}
