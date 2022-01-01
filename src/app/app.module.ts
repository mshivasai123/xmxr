import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/header/header.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ItemsListComponent } from './components/items-list/items-list.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { MaterialModule } from 'src/modules/shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesListComponent,
    AddCategoryComponent,
    ItemsListComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
