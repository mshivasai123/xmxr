import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

const routes: Routes = [
 
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ],
  exports :[
      MatCardModule
  ]
})
export class MaterialModule { }
