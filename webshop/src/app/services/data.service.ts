import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private headerGenre = new BehaviorSubject<string>('');
  currentHeaderGenreSelected = this.headerGenre.asObservable();

  constructor() { }


  changeHeaderGenre(selectedGenre: string) {
    this.headerGenre.next(selectedGenre)
  }

}

