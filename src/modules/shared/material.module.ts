import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule
  ],
  exports :[
      MatCardModule,
      MatButtonModule,
      MatInputModule
  ]
})
export class MaterialModule { }
