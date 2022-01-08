import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
=======
import { RouterModule } from '@angular/router';
>>>>>>> ae7910f01690168e814acfaedd47cb91cb95cfff
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
    MatSidenavModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
