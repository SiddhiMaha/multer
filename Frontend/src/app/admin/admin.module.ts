import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminRoutingModule } from './admin-routing.module';

import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductService } from './product.service';

@NgModule({
  declarations: [
    NavbarComponent,
    ProductCreateComponent,
    ProductListComponent,
    ProductEditComponent,
    DashboardComponent
 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminRoutingModule,
   

  ],
  providers: [ProductService] // Provide ProductService here
})
export class AdminModule { }
