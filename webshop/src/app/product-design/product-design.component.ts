import { Component, OnInit } from '@angular/core';
import { movieData } from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';
@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css'],
  inputs: ['movieImport']
  
})
export class ProductDesignComponent implements OnInit {


  constructor(public dataService: DataCloudService) { }
  
  
  ngOnInit() {
    // this.movie = this.importMovieData.getMovieInfo();
    console.log();
     }
     deleteMovies($window, event,item){
      if(confirm("Want to delte the movie?")){
        this.dataService.deleteMovie(item);
      }
     else 
       return false;
    }
  }
