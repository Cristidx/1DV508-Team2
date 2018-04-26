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
aVar:String;
movie = {
    
    id:'no id',
    title:'123',
    genre:'',
    imageURL:'',
    price:'',
    year:'',
    plot:''
}

  constructor(public dataService: DataCloudService) {  }

  ngOnInit() {
    this.dataService.getMovie().subscribe(Moviedata => {
      console.log(Moviedata);
      this.movies = Moviedata;
      
    });

    this.dataService.getCategories().subscribe(Catdata => {
      console.log(Catdata);
      this.categories = Catdata;

      
    });

 }

 accesProduct(movieID:string) {
   for(let item of this.movies){
    this.movie.title = item.title;
    this.movie.id = item.id;
    console.log(movieID);
   }
  }
}
export var var1 = this.movie;
