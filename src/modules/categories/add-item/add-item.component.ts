import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDriveService } from 'src/services/app-drive.service';
import { SharedService } from 'src/services/shared.service';
@Component({
  template: `
    <div class="success-message d-flex align-items-center justify-content-center">
      <mat-icon class="message-text f-15 me-2">check</mat-icon>
      <span class="fw-bold message-text me-2">
        Item Name
      </span>
      <span class="message-text">
        Added Successfully
      </span>
    </div>
  `,
})
export class SnackbarItemMessageComponent {
  constructor() { }
}
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  public itemName:string = ''
  intialName = ''
  newItem:any
  file:any
  fileName= "";
  showLoader = false;
  imageUrl = 'assets/images/placeholder.png';
  objectURL:any= ""
  modelImage = 'assets/images/file-icon.png';
  mediaFile:any
  mediaFileName = ""
  fileSize:any = ""
  constructor(private sanitizer:DomSanitizer,private sharedService: SharedService,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public appDriveService: AppDriveService
  ) { }

  ngOnInit(): void {
    if(this.data?.isEdit){
      this.intialName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1].split('.')[0]))
      this.itemName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1].split('.')[0]))
      this.fileName = this.itemName + "." +this.data.item.originalFilename.split('.')[1]
      this.mediaFileName = this.itemName + "." +this.data.item.mediaFileName.split('.')[1]
      this.objectURL = this.data.item?.webContentLink
      this.fileSize = this.data.item?.size
    }
  }

  profileUpload(event:any){
    console.log(event.target.files[0])
    this.file = event.target.files[0]
    this.fileName =  this.itemName + "." +this.file.name.split('.')[1]
    if (this.objectURL) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(this.objectURL);  
    }
  
    const fileD = this.file;
    this.objectURL = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(fileD));
  }

  save(){
    if(this.data?.isEdit){
      this.editCategory()
    }else{
      this.createItem()
    }
  }
  createItem(){
    if(this.data.parentId){
    this.showLoader = true;
        this.appDriveService.createitem(this.file,this.data.parentId,this.itemName).subscribe((item:any)=>{
          console.log(item,"item")
          this.newItem = item
          
          if(this.mediaFile){
            this.appDriveService.createMediaFile(this.mediaFile,this.data.parentId,item.name).subscribe((media: any)=>{
             console.log(media,"mediaData")
             this.newItem["mediaFileName"] = media.originalFilename
             this.newItem["mediaId"] = media.id
            },(err)=>{
              this.showLoader = false;
            })
          }
          this.showLoader = false;
          this.sharedService.openSnackBar(SnackbarItemMessageComponent,'success-message')
          this.dialogRef.close(this.newItem);
        },(err)=>{
          this.showLoader = false;
        })
     }
  }

  editCategory(){
    if((this.intialName != this.itemName) || this.file){
    this.showLoader = true;
      this.appDriveService.upDateItem(this.itemName,this.data.item,this.file).subscribe((item:any)=>{
        // this.dialogRef.close(true);
        this.showLoader = false;
        this.updateMediaData(item)
      },(err)=>{
        this.showLoader = false;
      })
    }else if(this.mediaFile) {
    this.showLoader = true;
      this.updateMediaData(this.data.item)
    }
   
  }
  updateMediaData(newItem:any){
    if(this.data.item.mediaId){
      this.appDriveService.updateMedia(this.data.item,this.mediaFile,newItem).subscribe((item:any)=>{
        this.showLoader = false;
        this.dialogRef.close(true);
      },(err)=>{
        this.showLoader = false;
      })
    }else if(this.mediaFile){
      this.appDriveService.createMediaFile(this.mediaFile,this.data.parentId,newItem.name).subscribe((media: any)=>{
        console.log(media,"mediaData")
        this.showLoader = false;
        this.dialogRef.close(true);
       },(err)=>{
        this.showLoader = false;
      })
    }else {
      this.showLoader = false;
      this.dialogRef.close(true);
    }
  }

  uploadmediaData(event:any){
    console.log(event.target.files[0])
    this.mediaFile = event.target.files[0]
    this.mediaFileName = this.itemName + "." + this.mediaFile.name.split('.')[1]
    this.fileSize = this.mediaFile.size
  }

}
