import { Component, OnInit, Input } from '@angular/core';
import { DataCloudService } from '../services/data-cloud.service';
import {movieData} from '../model/data';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [DataCloudService]
})
export class RatingComponent implements OnInit {
  starValue = 4;
  avgRating =3;
@Input() movieID: string;
  
  movies: movieData = {
    avgRating:0,
    totalRatings:0,
    id: ''
  }

  selectedID: string='s';
  constructor(private dataService: DataCloudService, private data: DataService) { }

  ngOnInit() {

    this.starValue=2;
    

    this.data.currentMovieIDSelected.subscribe(selectedID=>this.selectedID = selectedID);
    this.movies.id=this.selectedID;
    console.log('INSIDE rating: ' + this.movies.id);
  }
  starHandler(num){
    this.starValue=num;
    this.movies.avgRating=num;
    this.dataService.editMovie(this.movies);
  }
  
}
