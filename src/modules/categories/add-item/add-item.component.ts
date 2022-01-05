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
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public appDriveService: AppDriveService
  ) { }

  ngOnInit(): void {
    if(this.data?.isEdit){
      this.intialName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1]))
      this.itemName = JSON.parse(JSON.stringify(this.data.item.name?.split('_')[1]))
    }
  }

  profileUpload(event:any){
    console.log(event.target.files[0])
    this.file = event.target.files[0]
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
  }

}
