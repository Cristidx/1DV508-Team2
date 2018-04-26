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
})
export class AddProductComponent implements OnInit {
  
  categories: categoriesData[];
  
  movies: movieData = {
    title:'',
    genre:'',
    imageURL:'',
    price:'',
    year:'',
    plot:''
  }

  constructor(private dataService: DataCloudService, private authService: AuthService, private crud: CrudService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      console.log(Catdata);
      this.categories = Catdata;
    });
    
  }

  onSubmit(){
    if(this.movies.title != ''){
      this.dataService.addProduct(this.movies);
      this.movies.genre = '';
      this.movies.imageURL = '';
      this.movies.price = '';
      this.movies.year = '';
      this.movies.plot = '';
    }
  }
  
}
