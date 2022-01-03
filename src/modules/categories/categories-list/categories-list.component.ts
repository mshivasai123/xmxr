import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ClientMail, D2f_User_Data } from 'src/environments/googleConsole';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  // providers: [AppDriveService]
})
export class CategoriesListComponent implements OnInit {
  userFolderData: any;
  constructor(
    public dialog: MatDialog,
    public appDriveService: AppDriveService,
  ) { }

  ngOnInit(): void {
    this.appDriveService.fetchUserFolder().subscribe((response: any)=>{
      console.log(response,"data from user folder")
      if(!response.files.length){
        this.createUserFolder();
      } else {
        if(response.files[0].parents.includes(D2f_User_Data) && !response.files[0].trashed){
          this.userFolderData = response.files[0]
        }else{
         this.createUserFolder();
        }
      }
    })
  }

  createUserFolder(){
    this.appDriveService.createUserFolderInSharedFolder().subscribe((response:any)=>{
      console.log(response,"res")
      this.userFolderData = response
      response.permissions.forEach((permission: any) => {
         if(permission.emailAddress != ClientMail && permission.role != "owner"){
          this.appDriveService.deletePermission(response.id, permission.id).subscribe((res)=>{
           console.log("deleted")
          },(err)=>{
            console.log(err)
          })
         }
      });
    },(err)=>{
      console.log(err)
    })
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      // width: '250px'
      data: {
        parentId: this.userFolderData.id
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {
     
    });
  }

}
