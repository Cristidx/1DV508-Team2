import { Component, OnInit, Input, EventEmitter, Output, OnChanges, SimpleChange } from '@angular/core';
import { DataCloudService } from '../services/data-cloud.service';
import {movieData, starData} from '../model/data';
import { Observable } from 'rxjs/Observable';
import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [DataCloudService]
})
export class RatingComponent implements OnInit, OnChanges {

  @Input() movieID: string;

  user: User;
  stars: Observable<any>;
  avgRating: Observable<any>; 
  avgg:  Observable<number>;

  movie: starData = {
    movieId: '',
    userId: 'user3',
    value: 0,
  }

 
  selectedID: string ='';

  constructor(private dataService: DataCloudService, private data: DataService, private auth: AuthService) { }
 
  ngOnInit() {
   // this.avgg = this.avgRating as number;
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let newID = changes[propName];
      this.movie.id = newID.currentValue;
    }
    console.log('... '+this.movieID+' --- '+this.selectedID+' ...');


    this.stars = this.dataService.getMovieStars(this.movieID)

    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    })

    this.auth.user.subscribe((user) => this.user);
    
  } 
  

  starHandler(value){
    console.log('user' + this.user);
    this.dataService.setStar( this.movie.userId, this.movieID, value);
  }
}
