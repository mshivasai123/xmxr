import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ClientMail, D2f_User_Data } from 'src/environments/googleConsole';

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
  <h4>Are you sure you want to delete?</h4>

  <div class="text-end mt-4">
    <button class="btn me-3 btn-outline-primary" (click)="closeModel()">Cancel</button>
    <button class="btn btn-primary">Delete</button>
  </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  closeModel() {
    this.dialogRef.close();
  }

}


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
    this.appDriveService.fetchUserFolder().subscribe((response: any) => {
      console.log(response, "data from user folder")
      if (!response.files.length) {
        this.createUserFolder();
      } else {
        if (response.files[0].parents.includes(D2f_User_Data) && !response.files[0].trashed) {
          this.userFolderData = response.files[0]
        } else {
          this.createUserFolder();
        }
      }
    })
  }

  createUserFolder() {
    this.appDriveService.createUserFolderInSharedFolder().subscribe((response: any) => {
      console.log(response, "res")
      this.userFolderData = response
      response.permissions.forEach((permission: any) => {
        if (permission.emailAddress != ClientMail && permission.role != "owner") {
          this.appDriveService.deletePermission(response.id, permission.id).subscribe((res) => {
            console.log("deleted")
          }, (err) => {
            console.log(err)
          })
        }
      });
    }, (err) => {
      console.log(err)
    })
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      // width: '250px'
      data: {
        title: 'Add Category', isEdit: false,
        parentId: this.userFolderData.id
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {

    });
  }

  editCategory(): void {
    this.dialog.open(AddCategoryComponent, {
      data: { title: 'Edit Category', category: {}, isEdit: true }
    });
  }

  deleteCategory() {
    this.dialog.open(DeleteConfirmationDialog, {

    })

  }
}
