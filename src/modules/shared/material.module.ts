import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    MatRippleModule
  ],
  exports :[
      MatCardModule,
      MatRadioModule,
      MatIconModule,
      MatRippleModule,
      MatButtonModule,
      MatProgressSpinnerModule,
      MatMenuModule,
      MatFormFieldModule,
      MatInputModule
  ]
})
export class MaterialModule { }
 