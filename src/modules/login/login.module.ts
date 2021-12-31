import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { DemoModalsComponent } from './components/demo-modals/demo-modals.component';
import { TestModalComponent } from './components/test-modal/test-modal.component';
import { AccessTokenComponent } from './components/access-token/access-token.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    DemoModalsComponent,
    TestModalComponent,
    AccessTokenComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginModule { }
