import { Component, OnInit } from '@angular/core';
import { DataCloudService } from '../../services/data-cloud.service';
import { CrudService } from '../../services/crud.service';
import {movieData} from '../../model/data';
import {categoriesData} from '../../model/data';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-data-cloud',
  templateUrl: './data-cloud.component.html',
  styleUrls: ['./data-cloud.component.css'],
  providers: [ DataCloudService]
})
export class DataCloudComponent implements OnInit {

movies: movieData[];
categories: categoriesData[];
movie = {
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

selectedGenre:string;

  constructor(public dataService: DataCloudService, private data: DataService) {  }

  ngOnInit() {
    this.dataService.getMovie().subscribe(Moviedata => {
      this.movies = Moviedata;
    });

    this.dataService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    
    this.data.currentHeaderGenreSelected.subscribe(selectedGenre=>this.selectedGenre = selectedGenre);
 }

  accesProduct(event, item) {
    this.movie=item;
  }
}