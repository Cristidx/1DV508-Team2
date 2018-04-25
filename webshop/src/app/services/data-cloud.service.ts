import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {movieData} from '../model/data';
import {categoriesData} from '../model/data';

@Injectable()
export class DataCloudService {

  categoriesCollection: AngularFirestoreCollection<categoriesData>
  categoriesData: Observable<categoriesData[]>

  movieCollection: AngularFirestoreCollection<movieData>
  movieData: Observable<movieData[]>

  constructor(public afs: AngularFirestore) {

    this.movieData = this.afs.collection('Movies').valueChanges();
    this.categoriesData = this.afs.collection('Categories').valueChanges();
   }

   getCategories(){
    return this.categoriesData;  
  }
  getMovie(){
    return this.movieData;  
  }
}

