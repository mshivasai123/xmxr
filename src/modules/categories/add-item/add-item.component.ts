import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { AppDriveService } from 'src/services/app-drive.service';

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
  fileName= ""
  imageUrl = 'assets/images/placeholder.png';
  objectURL:any= ""
  modelImage = 'assets/images/file-icon.png';
  mediaFile:any
  mediaFileName = ""

  constructor(private sanitizer:DomSanitizer,
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
        this.appDriveService.createitem(this.file,this.data.parentId,this.itemName).subscribe((item:any)=>{
          console.log(item,"item")
          this.newItem = item
          if(this.mediaFile){
            this.appDriveService.createMediaFile(this.mediaFile,this.data.parentId,item.name).subscribe((media: any)=>{
             console.log(media,"mediaData")
             this.newItem["mediaFileName"] = media.originalFilename
             this.newItem["mediaId"] = media.id
            })
          }
          this.dialogRef.close(this.newItem);
        })
     }
  }

  editCategory(){
    if((this.intialName != this.itemName) || this.file){
      this.appDriveService.upDateItem(this.itemName,this.data.item,this.file).subscribe((item:any)=>{
        // this.dialogRef.close(true);
        this.updateMediaData(item)
      })
    }else if(this.mediaFile) {
      this.updateMediaData(this.data.item)
    }
   
  }
  updateMediaData(newItem:any){
    if(this.data.item.mediaId){
      this.appDriveService.updateMedia(this.data.item,this.mediaFile,newItem).subscribe((item:any)=>{
        this.dialogRef.close(true);
      })
    }else if(this.mediaFile){
      this.appDriveService.createMediaFile(this.mediaFile,this.data.parentId,newItem.name).subscribe((media: any)=>{
        console.log(media,"mediaData")
        this.dialogRef.close(true);
       })
    }else {
      this.dialogRef.close(true);
    }
  }

  uploadmediaData(event:any){
    console.log(event.target.files[0])
    this.mediaFile = event.target.files[0]
    this.mediaFileName = this.itemName + "." + this.mediaFile.name.split('.')[1]
  }

}
