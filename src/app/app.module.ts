import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CategoryManagementComponent } from './categories/category-management/category-management.component';
import { CategoryFilterComponent } from './categories/category-filter/category-filter.component';
import { SearchBarComponent } from './shared/search-bar/search-bar.component';
import { LoadingIndicatorComponent } from './shared/loading-indicator/loading-indicator.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductFormComponent,
    CategoryManagementComponent,
    CategoryFilterComponent,
    SearchBarComponent,
    LoadingIndicatorComponent,
    ErrorMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}