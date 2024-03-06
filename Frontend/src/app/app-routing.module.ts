import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { ProductEditComponent } from './admin/product-edit/product-edit.component';

const routes: Routes = [
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
