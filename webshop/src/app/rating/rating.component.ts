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


  selectedID: string ='';

  constructor(private dataService: DataCloudService, private data: DataService, private auth: AuthService) { }
 
  ngOnInit() {

   this.auth.user.subscribe((user) => { this.user = user }); 

  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    for (let propName in changes) {
      let newID = changes[propName];
    }


    this.stars = this.dataService.getMovieStars(this.movieID)

    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      let average =  ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed';
      if (typeof average === 'number') {
        return this.round(average, 1);
      } else {
        return average;
      }
    })
  } 
  
  round(number, precision) {
    var shift = function (number, precision) {
      var numArray = ("" + number).split("e");
      return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
    };
    return shift(Math.round(shift(number, +precision)), -precision);
  }

  starHandler(value){
    this.dataService.setStar( this.user.uid, this.movieID, value);
  }
}
