import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { movieData } from '../model/data';

@Injectable()
export class DataService {

  emptyMovie: movieData = {
    title:'',
    genre:'',
    imageURL:'',
    price:0,
    year:0,
    plot:'',
    stock: 0,
    director:'',
    dateAdded:'',
    id: ''
  }

  private headerGenre = new BehaviorSubject<string>('');
  currentHeaderGenreSelected = this.headerGenre.asObservable();

  private movieID = new BehaviorSubject<string>('');
  currentMovieIDSelected = this.movieID.asObservable();

  private movie = new BehaviorSubject<movieData>(this.emptyMovie);
  currentMovieSelected = this.movie.asObservable();



  constructor() { }


  changeHeaderGenre(selectedGenre: string) {
    this.headerGenre.next(selectedGenre)
  }

  getCurrentMovieID(selectedID: string) {
    this.movieID.next(selectedID)
  }

  getCurrentMovie(selectedMovie: movieData) {
    this.movie.next.(selectedMovie)
  }

}

