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
import {AddCategoryComponent} from './add-category/add-category.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import {HttpClientModule, HttpClient} from '@angular/common/http'; // DON'T TOUCH THIS LINE OR EVERYTHING DIES!!!!!
import { DataCloudComponent } from './components/data-cloud/data-cloud.component';
import { DataCloudService } from './services/data-cloud.service';
import { EditProductComponent } from './edit-product/edit-product.component';

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
    EditProductComponent
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
    MatModule
  ],
  providers: [AuthService, CrudService, DataCloudService],
  bootstrap: [AppComponent]
})
export class AppModule { }
