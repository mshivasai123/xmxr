import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppDriveService } from 'src/services/app-drive.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { ClientMail, D2f_User_Data } from 'src/environments/googleConsole';
import { Router } from '@angular/router';
import { SharedService } from 'src/services/shared.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'delete-confirmation-dialog',
  template: `
  <div class="mb-4 text-center">
    <h5 class="mb-0 me-4">Are you sure you want to delete?</h5>
  </div>
  <div class="text-center mt-4">
    <button class="bg-transparent border-0 me-md-3 me-1 roboto-font xmxr-secondary-btn" (click)="closeModel(false)">Cancel</button>
    <button class="roboto-font border-0 xmxr-primary-btn" mat-button (click)="closeModel(true)">Delete</button>
  </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  closeModel(del: boolean) {
    this.dialogRef.close(del);
  }
}


@Component({
  selector: 'share-dialog',
  template: `
  <div class="d-flex model-header mb-2 justify-content-between align-items-center">
    <h5 class="mb-0">Share</h5>
    <span class="material-icons cursor-pointer" (click)="dialogRef.close()">
      close
    </span>
  </div>

  <div class="input-group model-body mb-3">
    <input type="text" class="form-control" disabled [value]="data?.id" #userInput aria-describedby="basic-addon2">
    <span class="input-group-text cursor-pointer" title="copy" id="basic-addon2">
      <span class="material-icons" (click)="copyInputMessage(userInput)">
        content_copy
      </span> 
    </span>
  </div>
  `,
})
export class ShareDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  closeModel() {
    this.dialogRef.close();
  }

  /* To copy Text from Textbox */
  copyInputMessage(inputElement: any) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
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
  categoriesList: any = [];

  constructor(
    public dialog: MatDialog,
    public appDriveService: AppDriveService,
    public router: Router,
    public changeDetector: ChangeDetectorRef,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    let getBasicProfile: any = JSON.parse(localStorage.getItem('getBasicProfile') as any)
    if (ClientMail == getBasicProfile?.Email) {
      this.appDriveService.fetchAllUserFolder().subscribe((response: any) => {
        console.log(response, "eachusers for admin")
        if (response.files.length) {
          let listOfCatgoriesAllUsers: any = []
          const requestArray = response.files.map((val: any) => this.appDriveService.getListOfCategoriesByParentId(val.id))
          forkJoin(requestArray).subscribe((results: any) => {
            console.log(results, "forkJoin");
            results.forEach((categories: any) => {
              listOfCatgoriesAllUsers.push(...categories.files)
            });
            console.log(listOfCatgoriesAllUsers, "listOfCatgoriesAllUsers")
            this.categoriesList = listOfCatgoriesAllUsers
            this.finalDataRendering()
          });
        }
      })
    } else {
      this.appDriveService.fetchUserFolder().subscribe((response: any) => {
        console.log(response, "data from user folder")
        if (!response.files.length) {
          this.createUserFolder();
        } else {
          if (response.files[0].parents.includes(D2f_User_Data) && !response.files[0].trashed) {
            this.userFolderData = response.files[0]
            this.getCategoriesList()
          } else {
            this.createUserFolder();
          }
        }
      })
      this.changeDetector.detectChanges()
    }

  }

  createUserFolder() {
    if (!sessionStorage.getItem("isAccessToken")) {
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
  }

  getCategoriesList() {
    this.appDriveService.getListOfCategoriesByParentId(this.userFolderData.id).subscribe((categories: any) => {
      console.log(categories, "categories")
      this.categoriesList = categories.files
      this.finalDataRendering()
    })
  }

  showOptions(event: any) {
    let parentElement = event?.target?.offsetParent;
    if (parentElement.classList.contains('show-options')) {
      parentElement.classList.remove('show-options');
    } else {
      let elements = document.getElementsByClassName('parent-element');
      for (let i = 0; i < elements?.length; i++) {
        elements[i].classList.remove('show-options');
      }
      parentElement.classList.add('show-options');
    }
  }

  finalDataRendering() {
    this.categoriesList.forEach((category: any) => {
      this.appDriveService.getCategoryProfile(category.name, category.id).subscribe((profile: any) => {
        console.log(profile, "profile")
        category['profilePhoto'] = profile?.files[0]?.webContentLink;
        category['photoName'] = profile?.files[0]?.name;
        category['photoId'] = profile?.files[0]?.id;
        category['photoOrginalName'] = profile?.files[0]?.originalFilename
        this.changeDetector.detectChanges();
      })
      this.appDriveService.getListOfItemsByCatgryId(category).subscribe((itemsList: any) => {
        console.log(itemsList, "itemsList")
        if (itemsList.files.length) {
          const index = itemsList.files.findIndex((item: any) => item.name.split('_')[0] == category.name.split('_')[0])
          itemsList.files.splice(index, 1)
          let dummy = JSON.parse(JSON.stringify(itemsList.files))
          category["items"] = dummy.filter((item: any) => !item?.name?.includes('model')).length
        }
      })
    });
  }

  addCategory(): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      panelClass: 'xmxr-model',
      data: {
        title: 'Add Category', isEdit: false,
        parentId: this.userFolderData.id
      },
    });
    dialogRef.afterClosed().subscribe((newCategory) => {
      if (newCategory) {
        this.categoriesList.push(newCategory)
      }
    });
  }

  editCategory(category: any): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '350px',
      panelClass: 'xmxr-model',
      data: { title: 'Edit Category', category: category, isEdit: true }
    });
    dialogRef.afterClosed().subscribe((load) => {
      if (load) {
        this.getCategoriesList()
      }
    });
  }

  deleteCategory(category: any, index: number) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      width: '350px'

    })
    dialogRef.afterClosed().subscribe((load) => {
      if (load) {
        this.appDriveService.deleteCategory(category.id).subscribe((categoryDel: any) => {
          this.categoriesList.splice(index, 1)
        })
      }
    });

  }

  listItems(category: any) {
    this.router.navigateByUrl('/categories/items', { state: category })
  }

  shareCategory(categorie: any) {
    this.dialog.open(ShareDialog, {
      width: '350px',
      panelClass: 'xmxr-model',
      data: {
        id: categorie.id + 'c@TG' + categorie.name
      }
    })
  }


}
