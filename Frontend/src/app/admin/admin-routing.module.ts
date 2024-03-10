import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin/product-create', component: ProductCreateComponent },
  { path: 'edit-product/:productId', component: ProductEditComponent },
  // { path: 'product-edit/:id', component: ProductEditComponent },
  { path: 'admin/product-list', component: ProductListComponent },
  {path:'admin/users',component:UsersComponent},
  {path:'admin/orders',component:OrdersComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
