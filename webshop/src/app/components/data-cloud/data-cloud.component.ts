import { Component, OnInit } from '@angular/core';
import { DataCloudService } from '../../services/data-cloud.service';
import { CrudService } from '../../services/crud.service';
import {movieData} from '../../model/data';
import {categoriesData} from '../../model/data';

@Component({
  selector: 'app-data-cloud',
  templateUrl: './data-cloud.component.html',
  styleUrls: ['./data-cloud.component.css'],
  providers: [ CrudService ]
})
export class DataCloudComponent implements OnInit {

movies: movieData[];
categories: categoriesData[];

  constructor(public dataService: DataCloudService) {  }

  ngOnInit() {
    this.dataService.getMovie().subscribe(someMoviedata => {
      console.log(someMoviedata);
      this.movies = someMoviedata;
    });

    this.dataService.getCategories().subscribe(someCatdata => {
      console.log(someCatdata);
      this.categories = someCatdata;
    });

 }
}
