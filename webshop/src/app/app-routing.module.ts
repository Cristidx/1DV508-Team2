import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {AdminLogInComponent} from './admin-log-in/admin-log-in.component';
import { AddProductComponent } from './add-product/add-product.component';
import {ProductDesignComponent} from './product-design/product-design.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import {EditProductComponent} from './edit-product/edit-product.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'adminLogin', component: AdminLogInComponent},
  { path: 'app-add-product', component: AddProductComponent},
  { path: 'product-details', component: ProductDesignComponent},
  { path: 'add-category', component: AddCategoryComponent},
  { path: 'edit-product', component: EditProductComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

 