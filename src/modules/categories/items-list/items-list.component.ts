import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddItemComponent } from '../add-item/add-item.component';

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
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
})
export class ItemsListComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  addItem(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      // width: '250px'
      data: {
        title: 'Add Item', isEdit: false
      },
    });
    dialogRef.afterClosed().subscribe((dialogResult) => {

    });
  }

  editItem(): void {
    this.dialog.open(AddItemComponent, {
      data: { title: 'Edit Item', item: {}, isEdit: true }
    });
  }

  deleteItem() {
    this.dialog.open(DeleteConfirmationDialog, {

    })

  }

}
