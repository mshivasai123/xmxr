import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ClientMail } from 'src/environments/googleConsole';
@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss']
})
export class CategoriesListComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    public appDriveService: AppDriveService,
  ) { }

  ngOnInit(): void {
  }

  createUserFolder(){
    this.appDriveService.createUserFolderInSharedFolder().subscribe((response)=>{
      console.log(response,"res")
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
    this.dialog.open(AddCategoryComponent, {
      // width: '250px'
    });
  }

}
