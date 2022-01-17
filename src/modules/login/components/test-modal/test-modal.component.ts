import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {
  modelType ="url";
  urlLink = ""
  mediaFileName=""
  mediaFile:any
  objectURL =""
  constructor(
    public router: Router,
    public dialogRef: MatDialogRef<TestModalComponent>
    ) { }

  ngOnInit(): void {
  }
  uploadTest(){
    if(this.modelType == 'url'){
      this.showModelView()
    }else if(this.modelType == 'loadModel'){
      this.showUloadModelUrl()
    }
  }

  showModelView(){
    if(this.urlLink){
      this.dialogRef.close()
      this.router.navigateByUrl('/view-modal', { state: {url: this.urlLink } })
    }
  }

  uploadmediaData(event:any){
    console.log(event.target.files[0])
    this.mediaFile = event.target.files[0]
    this.mediaFileName = this.mediaFile.name

    if (this.objectURL) {
      // revoke the old object url to avoid using more memory than needed
      URL.revokeObjectURL(this.objectURL);  
    }
  
    const file = this.mediaFile;
    this.objectURL = URL.createObjectURL(file);
  }


  showUloadModelUrl(){
    if(this.objectURL){
      this.dialogRef.close()
      this.router.navigateByUrl('/view-modal', { state: {url: this.objectURL,type: "url" } })
    }
  }
}
