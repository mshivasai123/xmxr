import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-modal',
  templateUrl: './test-modal.component.html',
  styleUrls: ['./test-modal.component.scss']
})
export class TestModalComponent implements OnInit {
  modelType =""
  urlLink = ""
  mediaFileName=""
  mediaFile:any
  objectURL =""
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  showModelView(){
    if(this.urlLink){
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
      this.router.navigateByUrl('/view-modal', { state: {url: this.objectURL,type: "url" } })
    }
  }
}
