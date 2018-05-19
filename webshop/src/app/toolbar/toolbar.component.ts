import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataCloudService } from '../services/data-cloud.service';
import { categoriesData } from '../model/data';
import { AddCategoryComponent } from '../add-category/add-category.component'
import { User } from '../model/user';
import { DataService } from '../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  selectedGenre:string;
  showMovieCheck: boolean;
  categories: categoriesData[];
  user: User;

  @Output() StarEvent = new EventEmitter<number>();
  @Output() resetStarEvent = new EventEmitter<number>();

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
  openAddCategoryDialog() {
   
    let dialogRef = this.dialog.open(AddCategoryComponent);
  }
  genreValue(event, value){
    this.selectedGenre = value;
    this.data.changeHeaderGenre(this.selectedGenre)
    this.showMovieCheck=true;
    this.data.getavgRating(this.showMovieCheck);
    this.router.navigate(['/']);
  }

  starHandler(num){
    this.StarEvent.emit(num);
  }
  resetStars(){
    this.resetStarEvent.emit(-1);
  }
}
