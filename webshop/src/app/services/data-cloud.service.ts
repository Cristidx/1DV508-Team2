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

    //this.movieData = this.afs.collection('Movies').valueChanges();
    
    this.movieCollection = this.afs.collection('Movies');

    this.movieData = this.afs.collection('Movies').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data=a.payload.doc.data() as movieData;
        data.id = a.payload.doc.id;
        return data;
      });
    });


    this.categoriesData = this.afs.collection('Categories').valueChanges();
   }

  
   getCategories(){
    return this.categoriesData;  
  }
  getMovie(){
    return this.movieData;  
  }
  addProduct(movieData: movieData){
    this.movieCollection.add(movieData);
  }

}

