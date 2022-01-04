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
  newItem:any
  file:any
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public appDriveService: AppDriveService
  ) { }

  ngOnInit(): void {
  }

  profileUpload(event:any){
    console.log(event.target.files[0])
    this.file = event.target.files[0]
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

}
