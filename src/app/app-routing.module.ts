import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginModule } from 'src/modules/login/login.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
