import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-modal',
  templateUrl: './view-modal.component.html',
  styleUrls: ['./view-modal.component.scss']
})
export class ViewModalComponent implements OnInit {
  loadUrl = ""
  typeUrl:any =""
  constructor(private location: Location,
    public router: Router) { }

  ngOnInit(): void {  
    let state: any = this.location.getState()
    if(state.url){
      this.typeUrl = state.type ?? 'google'
      this.loadUrl = state.url
    }else {
      this.router.navigate([''])
    }
  }

}
