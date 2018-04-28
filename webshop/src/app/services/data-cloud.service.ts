import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { movieData } from '../model/data';
import { categoriesData } from '../model/data';

@Injectable()
export class DataCloudService {

  categoriesCollection: AngularFirestoreCollection<categoriesData>
  categoriesData: Observable<categoriesData[]>
  categoryDoc: AngularFirestoreDocument<categoriesData>;

  movieCollection: AngularFirestoreCollection<movieData>
  movieData: Observable<movieData[]>
  movieDoc: AngularFirestoreDocument<movieData>;
  
  constructor(public afs: AngularFirestore) {

    //this.movieData = this.afs.collection('Movies').valueChanges();
    this.movieCollection = this.afs.collection('Movies');
    this.movieData = this.afs.collection('Movies').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as movieData;
        data.id = a.payload.doc.id;
        return data;
      });
    });


    //this.categoriesData = this.afs.collection('Categories').valueChanges();
    this.categoriesCollection = this.afs.collection('Categories');
    this.categoriesData = this.afs.collection('Categories').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as categoriesData;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }


  getCategories() {
    return this.categoriesData;
  }
  getMovie() {
    return this.movieData;
  }
  addProduct(movieData: movieData) {
    this.movieCollection.add(movieData);
  }
  addCategory(categoriesData: categoriesData) {
    this.categoriesCollection.add(categoriesData);

  }
   /* To delete categories */
  deleteCategory(categoriesData: categoriesData) {
    this.categoryDoc=this.afs.doc(`Categories/${categoriesData.id}`);
  }
  /* To delete movies item by id */
  deleteMovie(movieData: movieData) {
    this.movieDoc = this.afs.doc(`Movies/${movieData.id}`);
    this.movieDoc.delete();
  }

  getDate(date:Date):string{
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const mounth = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${mounth}-${day}-${hours}-${min}-${sec}`;
  }
}

