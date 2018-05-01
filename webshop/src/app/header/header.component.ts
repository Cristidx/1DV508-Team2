import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataCloudService } from '../services/data-cloud.service';
import { categoriesData } from '../model/data';
import { AddCategoryComponent } from '../add-category/add-category.component'
import { User } from '../model/user';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  user: User;
  categories: categoriesData[];
  selectedGenre:string;
  constructor(private dataService: DataCloudService,private authService: AuthService, private data: DataService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    })

    this.data.currentHeaderGenreSelected.subscribe(selectedGenre=>this.selectedGenre = selectedGenre);
    console.log(this.selectedGenre);
  }
  private signOut() {
    this.authService.signOut();   
  }
  genreValue(event, value){
  this.selectedGenre = value;
  this.data.changeHeaderGenre(this.selectedGenre)
  }
}
