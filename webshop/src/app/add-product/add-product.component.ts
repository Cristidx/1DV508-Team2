import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { $ } from 'protractor';
import { AngularFireAuth } from 'angularfire2/auth';
import { DataCloudService } from '../services/data-cloud.service';
import {movieData} from '../model/data';
import {categoriesData} from '../model/data';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [DataCloudService]
})
export class AddProductComponent implements OnInit {
  
  currentDate = new Date();
  categories: categoriesData[];
  
  movies: movieData = {
    title:'',
    genre:'',
    imageURL:'',
    price:0,
    year:0,
    plot:'',
    stock:0,
    director:'',
    dateAdded:''
  }

  constructor(private dataService: DataCloudService, private authService: AuthService, private crud: CrudService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      console.log(Catdata);
      this.categories = Catdata;
      console.log(this.dataService.getDate(this.currentDate));
      
    });
    
  }

  onSubmit(){
    if((this.movies.title != '' && this.movies.imageURL != '')&&
        (this.movies.genre != '' && this.movies.director != '')){
      this.movies.dateAdded = this.dataService.getDate(this.currentDate);
      this.dataService.addProduct(this.movies);
      this.movies.title ='';
      this.movies.genre = '';
      this.movies.imageURL = '';
      this.movies.price = 0;
      this.movies.year = 0;
      this.movies.plot = '';
      this.movies.stock = 0;
      this.movies.director = '';
      this.movies.dateAdded ='';
    }
  }

  Ctrl($scope)
  {
      $scope.date = new Date();
  }
}
