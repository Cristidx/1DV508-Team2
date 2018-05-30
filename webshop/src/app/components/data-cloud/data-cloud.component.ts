import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
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
import * as Fuse from 'fuse-js-latest';
import * as Fuse2 from 'fuse-js-latest';

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

movie: movieData[];
categories: categoriesData[];
movie2 = {
  title:'',
  genre:'',
  imageURL:'',
  price:0,
  year:0,
  plot:'',
  stock:0,
  director:'',
  dateAdded:'',
  rating:'',
  DOTDstatus: false,
  DOTDprice: 0
}
title;

fuse: Fuse;
options = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
    "director"
  ]
};

fuse2: Fuse2;
options2 = {
  shouldSort: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "genre",
  ]
};

selectedGenre:string;

searchTarget: string;

showMovieCheck: boolean=true;
stars: number = -1;

  constructor(public dataCloudService: DataCloudService, private data: DataService,private cartService: CartService) {
    
   }

  ngOnInit() {
    this.dataCloudService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    
    this.data.currentHeaderGenreSelected.subscribe(selectedGenre=> {
      this.selectedGenre = selectedGenre;
      this.filterMovie(this.selectedGenre); 
    });
    this.data.currentListCheck.subscribe(showMovieCheck=>this.showMovieCheck = showMovieCheck);

    this.data.currentSearchTarget.subscribe((value) => { 
      this.searchTarget = value; 
      this.filterMovies(this.searchTarget); 
    });

    

    if (this.selectedGenre.length > 0){
      this.dataCloudService.getMovisByCat(this.selectedGenre)
      .then((movieData) => {
        this.movie = movieData;
      })
      .catch((error) => console.log(error));
  }

  }

  ngAfterViewInit() {
    this.dataCloudService.getMovie().subscribe(Moviedata => {
      this.showMovieCheck = true; 
      this.allMovies = Moviedata;
      this.movies = this.allMovies;
      this.fuse = new Fuse(this.movies, this.options);
      this.fuse2 = new Fuse2(this.movies, this.options2);
    });
  }

  filterMovies(searchTarget: string) {
    if (!(searchTarget === '')) {
      this.movies = this.fuse.search(searchTarget);
    } else {
      this.movies = this.allMovies;
    }
  }

  filterMovie(searchTarget: string) {
    if (!(searchTarget === '')) {
      this.movies = this.fuse2.search(searchTarget);
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

addToCart(item) {
 this.cartService.addMovieToCart(item);
}

reciveStars($event) {
  this.stars = $event -1;

  this.dataCloudService.getMovisByCat(this.selectedGenre)
  .then((movieData) => {
    this.movie = movieData;
  })
  .catch((error) => console.log(error));

}

resetStars($event) {
  this.stars = $event;
}
}