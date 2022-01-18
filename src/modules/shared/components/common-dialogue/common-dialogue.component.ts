import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-dialogue',
  templateUrl: './common-dialogue.component.html',
  styleUrls: ['./common-dialogue.component.scss']
})
export class CommonDialogueComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CommonDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }

}
