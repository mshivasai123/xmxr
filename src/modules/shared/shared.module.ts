import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from './material.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatSidenavModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
