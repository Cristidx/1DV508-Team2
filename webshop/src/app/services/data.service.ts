import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private headerGenre = new BehaviorSubject<string>('');
  currentHeaderGenreSelected = this.headerGenre.asObservable();

  private movieID = new BehaviorSubject<string>('');
  currentMovieIDSelected = this.movieID.asObservable();

  private listCheck = new BehaviorSubject<boolean>(true);
  currentListCheck  = this.listCheck.asObservable();
  constructor() { }


  changeHeaderGenre(selectedGenre: string) {
    this.headerGenre.next(selectedGenre)
  }

  getCurrentMovieID(selectedID: string) {
    this.movieID.next(selectedID)
  }

  getavgRating(selectedListCheck: boolean) {
    this.listCheck.next(selectedListCheck)
  }

}

