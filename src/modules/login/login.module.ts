import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { DemoModalsComponent } from './components/demo-modals/demo-modals.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { ViewModalComponent } from './components/view-modal/view-modal.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'access-token',
    component: AccessTokenComponent
  },
  {
    path: 'demo-model',
    component: DemoModalsComponent
  },
  {
    path: 'test-model',
    component: TestModalComponent
  },
  {
    path: 'view-modal',
    component: ViewModalComponent
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    DemoModalsComponent,
    TestModalComponent,
    AccessTokenComponent,
    LoginPageComponent,
    ViewModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    NgxDocViewerModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
