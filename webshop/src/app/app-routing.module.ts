import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import {AdminLogInComponent} from './admin-log-in/admin-log-in.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'adminLogin', component: AdminLogInComponent},
  { path: 'app-add-product', component: AddProductComponent},
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }

