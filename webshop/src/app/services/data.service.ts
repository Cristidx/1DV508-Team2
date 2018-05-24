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

  private searchTarget = new BehaviorSubject<string>('');
  currentSearchTarget = this.searchTarget.asObservable();

  private orderUid = new BehaviorSubject<string>('');
  currentOrderUid = this.orderUid.asObservable();
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

  updateSearchTarget(newSearchTarget: string) {
    this.searchTarget.next(newSearchTarget);
  }
  
  updateOrderUid(newUid: string) {
    console.log('newuid' + newUid);
    this.orderUid.next(newUid);
  }
}

