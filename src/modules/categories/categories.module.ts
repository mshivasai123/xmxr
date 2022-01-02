import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { ItemsListComponent } from './items-list/items-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { MaterialModule } from '../shared/material.module';

const routes: Routes = [
    {
        path :'list',
        component: CategoriesListComponent
    },
    {
        path :'add',
        component: AddCategoryComponent
    },
    {
        path :'items',
        component: ItemsListComponent
    },
    {
        path :'add-item',
        component: AddItemComponent
    }
];

@NgModule({
  declarations: [
      AddItemComponent,
      ItemsListComponent,
      AddCategoryComponent,
      CategoriesListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ],
})
export class CategoriesModule { }
