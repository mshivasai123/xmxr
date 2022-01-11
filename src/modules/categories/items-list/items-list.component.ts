import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddItemComponent } from '../add-item/add-item.component';
import { Location } from '@angular/common';
import { AppDriveService } from 'src/services/app-drive.service';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/services/shared.service';
@Component({
  selector: 'delete-confirmation-dialog',
  template: `
  <div class="d-flex mb-4 justify-content-between align-items-center">
    <h5 class="mb-0 me-4">Are you sure you want to delete?</h5>
    <span class="material-icons cursor-pointer" (click)="dialogRef.close()">
      close
    </span>
  </div>

  <div class="text-end mt-4">
    <button class="btn me-3 btn-outline-primary" (click)="closeModel(false)">Cancel</button>
    <button class="btn btn-primary" (click)="closeModel(true)">Delete</button>
  </div>
  `,
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  closeModel(del:boolean) {
    this.dialogRef.close(del);
  }

}
@Component({
  selector: 'share-dialog',
  template: `
  <div class="d-flex mb-4 justify-content-between align-items-center">
    <h5 class="mb-0">Share</h5>
    <span class="material-icons cursor-pointer" (click)="dialogRef.close()">
      close
    </span>
  </div>

  <div class="input-group mb-3">
    <input type="text" class="form-control" [value]="data?.id" #userInput  aria-describedby="basic-addon2">
    <span class="input-group-text cursor-pointer" title="copy" id="basic-addon2">
      <span class="material-icons"  (click)="copyInputMessage(userInput)">
        content_copy
      </span> 
    </span>
  </div>
  `,
})
export class ShareDialog implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
      console.log(this.data.id)
  }
  closeModel() {
    this.dialogRef.close();
  }
  /* To copy Text from Textbox */
  copyInputMessage(inputElement: any){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }
  

}

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {
  parentCategoryData:any 
  itemsList:any =[]
  totalListItems:any 
  constructor(
    public dialog: MatDialog,
    public router: Router,
    private location:Location,
    public appDriveService: AppDriveService,
    public sharedService:SharedService
  ) { }

  ngOnInit(): void {
    console.log(this.location.getState())
    let state: any = this.location.getState()
    this.parentCategoryData = state
    if(state?.id){
      if(sessionStorage.getItem("isAccessToken") == "true"){
        this.appDriveService.getItemsListByToken(state.id).subscribe((res:any)=>{
          console.log(res,"res")
          if(res.items.length){
            const requestArray = res.items.map((val:any)=> this.appDriveService.getItemByItemId(val.id))
            forkJoin(requestArray).subscribe(results => {
              console.log(results,"forkJoin");
              this.itemsList = results
              this.totalListItems = JSON.parse(JSON.stringify(this.itemsList))
              this.renderListItems(state)
            });
          }
          
        })
      }
      this.getItemsList(state)
    }else{
      this.router.navigate(['/categories'])
    }
  }

  getItemsList(state:any){
    this.appDriveService.getListOfItemsByCatgryId(state).subscribe((itemsList:any)=>{
      console.log(itemsList,"itemsList")
      this.itemsList = itemsList.files
      this.totalListItems = JSON.parse(JSON.stringify(this.itemsList))
      this.renderListItems(state)
   })
  }

  renderListItems(state:any){
    if(this.itemsList.length){
      const index = this.itemsList.findIndex((item:any)=> item.name.split('_')[0] == state.name.split('_')[0] )
      this.itemsList.splice(index,1)
      let dummy = JSON.parse(JSON.stringify(this.itemsList))
      let looper = dummy.filter((item:any)=> !item?.name?.includes('model'))
       looper.forEach((val:any) => {
       let mediaItem =  this.totalListItems.find((media:any)=> media.name.includes(val.name.split('.')[0]+'model'))
           val["mediaFileName"] = mediaItem?.originalFilename ?? ''
           val["mediaId"] = mediaItem?.id ?? ''
      });
      this.itemsList = JSON.parse(JSON.stringify(looper))
      console.log(this.itemsList,"this.itemsList")
    }
  }

  addItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '500px',
      data: {
        title: 'Add Item', isEdit: false,
        parentId:  this.parentCategoryData.id
      },
    });
    dialogRef.afterClosed().subscribe((newItem) => {
      if(newItem){
        // this.itemsList.push(newItem)
       let state: any = this.location.getState()
        this.getItemsList(state)
      }
    });
  }

  editItem(item: any): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      data: { title: 'Edit Item', item: item,parentId:  this.parentCategoryData.id, isEdit: true },
       width: '500px',
    });
    dialogRef.afterClosed().subscribe((load) => {
      if(load){
       let state: any = this.location.getState()
        this.getItemsList(state)
     }
   });
  }

  deleteItem(item:any,index:number) {
    const dialogRef =this.dialog.open(DeleteConfirmationDialog, {
      width: '500px',
    })

    dialogRef.afterClosed().subscribe((load) => {
      if(load){
        this.appDriveService.deleteItem(item.id).subscribe((categoryDel:any)=>{
          this.itemsList.splice(index,1)
         })
     }
   });

   

  }

  bactToCategories(){
    this.router.navigate(['/categories'])
  }

  openViewMedia(item:any){
    this.router.navigateByUrl('/categories/mediaview', { state: {id: item.id + 'it@m' + item.mediaId} })
  }

  shareCategory(item:any) {
    this.dialog.open(ShareDialog, {
      width: '500px',
      data: {
        id:  item.id + 'it@m' + item.mediaId
      }
    })
  }

}
