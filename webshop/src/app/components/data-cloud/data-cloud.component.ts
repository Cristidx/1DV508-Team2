import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { DataCloudService } from '../../services/data-cloud.service';
import { CrudService } from '../../services/crud.service';
import {movieData} from '../../model/data';
import {categoriesData} from '../../model/data';
import { Title } from '@angular/platform-browser';
import { DataService } from '../../services/data.service';
import { trigger,state,style,transition,animate,keyframes } from '@angular/animations';
import { templateJitUrl } from '@angular/compiler';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-data-cloud',
  templateUrl: './data-cloud.component.html',
  styleUrls: ['./data-cloud.component.css'],
  providers: [ DataCloudService],
 
  animations: [
    trigger('myAwesomeAnimation', [
      state('small', style({
            transform: 'scale(1)',
        })),
        state('large', style({
            transform: 'scale(1.2)',
        })),
        transition('small => large', animate('100ms ease-in')),
    ]),
  ]
})
export class DataCloudComponent implements OnInit, AfterViewInit{
state: string = 'small';
movies: movieData[];
allMovies: movieData[];
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
title;

selectedGenre:string;

searchTarget: string;

stars: Observable<any>;
avgRating: Observable<any>;

currentID: string ='RCn6upR27BH3IyRSMRZr';

showMovieCheck: boolean=true;

  constructor(public dataCloudService: DataCloudService, private data: DataService,private cartService: CartService) {
    
   }

  ngOnInit() {
    
    this.dataCloudService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    
    this.data.currentHeaderGenreSelected.subscribe(selectedGenre=>this.selectedGenre = selectedGenre);
    this.data.currentListCheck.subscribe(showMovieCheck=>this.showMovieCheck = showMovieCheck);

    this.stars = this.dataCloudService.getMovieStars(this.currentID)

    this.avgRating = this.stars.map(arr => {
      const ratings = arr.map(v => v.value)
      return ratings.length ? ratings.reduce((total, val) => total + val) / arr.length : 'not reviewed'
    })

    
    this.data.currentSearchTarget.subscribe((value) => { 
      this.searchTarget = value; 
      this.filterMovies(this.searchTarget); 
    });
  }

  addToCart(item) {
    console.log(item);
  }

  ngAfterViewInit() {
    this.showMovieCheck = true; 
    this.dataCloudService.getMovie().subscribe(Moviedata => {
      this.allMovies = Moviedata;
      this.movies = this.allMovies;
    });
  }

  filterMovies(searchTarget: string) {
    if (!(searchTarget === '')) {
      this.movies = this.allMovies.filter((movie) => movie.title === searchTarget);
    } else {
      this.movies = this.allMovies;
    }
  }

  accesProduct(event, item) {
    this.movie=item;
  }
  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
}

theclick(){
  var x = document.getElementById("demo");
  x.style.color = "red";
}

addToCart() {
 this.cartService.addMovieToCart(this.movie);
}

}