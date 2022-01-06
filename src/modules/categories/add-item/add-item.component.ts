import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  mediaFile:any
  mediaFileName = ""

  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public appDriveService: AppDriveService
  ) { }

  ngOnInit(): void {
    if(this.data?.isEdit){
      this.intialName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1]))
      this.itemName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1]))
      this.fileName = this.data.item.originalFilename
      this.mediaFileName = this.data.item.mediaFileName
    }
  }

  profileUpload(event:any){
    console.log(event.target.files[0])
    this.file = event.target.files[0]
    this.fileName = this.file.name
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
            this.appDriveService.createMediaFile(this.mediaFile,this.data.parentId,item.id).subscribe((media: any)=>{
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
        this.dialogRef.close(true);
      })
    }
    if(this.mediaFile){
      this.appDriveService.updateMedia(this.mediaFile,this.data.item).subscribe((item:any)=>{
        this.dialogRef.close(true);
      })
    }
  }

  uploadmediaData(event:any){
    console.log(event.target.files[0])
    this.mediaFile = event.target.files[0]
    this.mediaFileName = this.mediaFile.name
  }

}
