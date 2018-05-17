import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {AdminLogInComponent} from './admin-log-in/admin-log-in.component';
import { AddProductComponent } from './add-product/add-product.component';
import {ProductDesignComponent} from './product-design/product-design.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersListComponent } from './orders-list/orders-list.component'
import { OrderviewComponent } from './orderview/orderview.component';
import {AdminOrdersComponent} from "./admin-orders/admin-orders.component";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'adminLogin', component: AdminLogInComponent},
  { path: 'app-add-product', component: AddProductComponent},
  { path: 'product-details', component: ProductDesignComponent},
  { path: 'add-category', component: AddCategoryComponent},
  { path: 'app-edit-product', component: EditProductComponent},
  { path: 'app-product-design/:id', component: ProductDesignComponent},
  { path: 'app-order-details', component: OrderDetailsComponent},
  { path: 'app-orders-list', component: OrdersListComponent},
  { path: 'orderview', component: OrderviewComponent},
  { path: 'admin-orders', component:AdminOrdersComponent},
  { path: 'app-shopping-cart', component: ShoppingCartComponent},
  { path: 'profile', component: ProfileComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

