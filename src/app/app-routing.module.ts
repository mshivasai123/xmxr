import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
// import { LoginModule } from 'src/modules/login/login.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path :'categories-list',
    component: CategoriesListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
