import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private headerGenre = new BehaviorSubject<string>('');
  currentHeaderGenreSelected = this.headerGenre.asObservable();

  private movieID = new BehaviorSubject<string>('');
  currentMovieIDSelected = this.movieID.asObservable();


  constructor() { }


  changeHeaderGenre(selectedGenre: string) {
    this.headerGenre.next(selectedGenre)
  }

  getCurrentMovieID(selectedID: string) {
    this.movieID.next(selectedID)
  }

}

