import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatDialogModule
  ],
  exports :[
      MatCardModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule
  ]
})
export class MaterialModule { }
 