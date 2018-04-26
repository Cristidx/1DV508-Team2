import { Component, OnInit } from '@angular/core';
import { DataCloudService } from '../../services/data-cloud.service';
import { CrudService } from '../../services/crud.service';
import {movieData} from '../../model/data';
import {categoriesData} from '../../model/data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-data-cloud',
  templateUrl: './data-cloud.component.html',
  styleUrls: ['./data-cloud.component.css'],
  providers: [ CrudService ]
})
export class DataCloudComponent implements OnInit {

movies: movieData[];
categories: categoriesData[];
movie = {
    id:'',
    title:'',
    genre:'',
    imageURL:'',
    price:'',
    year:'',
    plot:''
}

  constructor(public dataService: DataCloudService) {  }

  ngOnInit() {
    this.dataService.getMovie().subscribe(Moviedata => {
      this.movies = Moviedata;
      
    });

    this.dataService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;

      
    });

 }

 accesProduct(event, item) {
  this.movie=item;
  
  }
  
}

