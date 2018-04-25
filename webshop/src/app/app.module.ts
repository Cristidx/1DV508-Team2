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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HeaderComponent,
    AdminLogInComponent,
    AddProductComponent,
    ProductDesignComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
