import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataCloudService } from '../services/data-cloud.service';
import { categoriesData } from '../model/data';
import { AddCategoryComponent } from '../add-category/add-category.component'
import { User } from '../model/user';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user: User;
  categories: categoriesData[];
  selectedGenre:string;
  showMovieCheck: boolean;
  constructor(private dataService: DataCloudService,private authService: AuthService, 
              private data: DataService, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });

    this.data.currentListCheck.subscribe(showMovieCheck=>this.showMovieCheck = showMovieCheck);
    this.data.currentHeaderGenreSelected.subscribe(selectedGenre=>this.selectedGenre = selectedGenre);
  }
  private signOut() {
    this.authService.signOut();
    this.router.navigate(['']);  
  }
  genreValue(event, value){
  this.selectedGenre = value;
  this.data.changeHeaderGenre(this.selectedGenre)
  this.showMovieCheck=true;
  this.data.getavgRating(this.showMovieCheck);
  this.router.navigate(['/']);
}

  openAddProductDialog() {
    let dialogRef = this.dialog.open(AddProductComponent,{

      width: '35%'
    });
  }

  openAddCategoryDialog() {
   
    let dialogRef = this.dialog.open(AddCategoryComponent);
  }

  openLoginComponentDialog() {
    let dialogRef = this.dialog.open(LoginComponent);
  }
  
  openProfileDialog() {

	let dialogRef = this.dialog.open(ProfileComponent,{
    width: '50%'
	});
  }

  goToCart() {
    this.router.navigate(['/app-shopping-cart']);
  }


}
