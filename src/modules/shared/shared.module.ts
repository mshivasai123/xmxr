import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonDialogueComponent } from './components/common-dialogue/common-dialogue.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent,
    CommonDialogueComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSidenavModule,
    MatProgressSpinnerModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
