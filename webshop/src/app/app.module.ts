import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatModule } from './mat.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AppRoutingModule } from './/app-routing.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AdminLogInComponent } from './admin-log-in/admin-log-in.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDesignComponent } from './product-design/product-design.component';
import { CrudService } from './services/crud.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DataCloudComponent } from './components/data-cloud/data-cloud.component';
import { DataCloudService } from './services/data-cloud.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DataService } from './services/data.service';
import { MatDialog, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RatingComponent } from './rating/rating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderviewComponent } from './orderview/orderview.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersListComponent } from './orders-list/orders-list.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderService } from './services/order.service';
import { CartService } from './services/cart.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FromIDToMoviePipe } from "./pipes/movie.pipe";
import { CarrouselComponent } from './carrousel/carrousel.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    AdminLogInComponent,
    AddProductComponent,
    ProductDesignComponent,
    DataCloudComponent,
    AddCategoryComponent,
    EditProductComponent,
    RatingComponent,
    OrderDetailsComponent,
    OrdersListComponent,
    OrderviewComponent,
    AdminOrdersComponent,
    ShoppingCartComponent,
    ProfileComponent,
    ToolbarComponent,
    FromIDToMoviePipe,
    CarrouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, CrudService, DataCloudService, DataService, MatDialog, OrderService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
