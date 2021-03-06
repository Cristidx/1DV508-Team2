import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { movieData, starData} from '../model/data';
import { categoriesData } from '../model/data';
import { Order } from '../model/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from './data.service';
import { resolve } from 'q';

@Injectable()
export class DataCloudService {

  categoriesCollection: AngularFirestoreCollection<categoriesData>
  categoriesData: Observable<categoriesData[]>
  categoryDoc: AngularFirestoreDocument<categoriesData>;

  movieCollection: AngularFirestoreCollection<movieData>
  movieData: Observable<movieData[]>
  movieDoc: AngularFirestoreDocument<movieData>;

  starCollection: AngularFirestoreCollection<starData>
  starData: Observable<starData[]>
  starDoc: AngularFirestoreDocument<starData>;
  constructor(public afs: AngularFirestore, private snackBar: MatSnackBar) {

    this.movieCollection = this.afs.collection('Movies', ref => ref.orderBy('dateAdded', 'desc'));
    this.movieData = this.movieCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as movieData;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    this.categoriesCollection = this.afs.collection('Categories');
    this.categoriesData = this.afs.collection('Categories').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as categoriesData;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    this.starCollection = this.afs.collection('Stars');
    this.starData = this.afs.collection('Stars').snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as starData;
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

  async getMovieFromIDs(ids: string[]) {
    return new Promise((resolve) => {
      const movieArray: movieData[] = [];
      const sub = this.movieData.subscribe((movies) => {
        ids.forEach((id) => {
          movies.forEach((movie) => {
            if (id === movie.id) {
              movieArray.push(movie);
            }
          });
        });
        sub.unsubscribe();
        resolve(movieArray);
      });
    })
  }

  getMovieStars(movieId) {
    const starsRef = this.afs.collection('Stars', ref => ref.where('movieId', '==', movieId));
    return starsRef.valueChanges();
  }

  addProduct(movieData: movieData) {
    this.movieCollection.add(movieData).then(() => this.snackBar.open('A movie was succesfully added', 'Dismiss', { duration: 3000 }), console.error);
  }

  addCategory(categoriesData: categoriesData) {
    this.categoriesCollection.add(categoriesData).then(() => this.snackBar.open('A category was succesfully created', 'Dismiss', { duration: 3000 }), console.error);
  }

  deleteCategory(categoriesData: categoriesData) {
    this.categoryDoc = this.afs.doc(`Categories/${categoriesData.id}`);
    this.categoryDoc.delete().then(() => this.snackBar.open('A category was successfully deleted', 'Dismiss', { duration: 3000 }), console.error);
  }

  deleteMovie(movieData: movieData) {
    this.movieDoc = this.afs.doc(`Movies/${movieData.id}`);
    this.movieDoc.delete().then(() => this.snackBar.open('A movie was successfully deleted', 'Dismiss', { duration: 3000 }), console.error);
  }

  editMovieStarts(data: movieData) {
    console.log('Data ID ' + data.id);
    this.movieDoc = this.afs.doc(`Movies/${data.id}`);
    this.movieDoc.update(data);
  }

  editMovieStock(data: movieData) {
    console.log('Data ID ' + data.id);
    this.movieDoc = this.afs.doc(`Movies/${data.id}`);
    this.movieDoc.update(data);
  }

  editMovie(data: movieData) {
    console.log('Data ID ' + data.id);
    this.movieDoc = this.afs.doc(`Movies/${data.id}`);
    this.movieDoc.update(data).then(() => this.snackBar.open('A movie was successfully updated', 'Dismiss', { duration: 3000 }), console.error);
  }

  setStar(userId, movieId, value) {
    const star: starData = { userId, movieId, value };
    const starPath = `Stars/${star.userId}_${star.movieId}`;
    return this.afs.doc(starPath).set(star)
  }

  getDate(date: Date): string {
    const sec = date.getSeconds();
    const min = date.getMinutes();
    const hours = date.getHours();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${year}-${month}-${day}-${hours}-${min}-${sec}`;
  }

  async getMovisByCat(genre: string) {
    let customerArray: movieData[] = [];
    this.toOrderArray()
      .then((movieData: movieData[]) => {
        movieData.forEach(element => {
          if (element.genre === genre) {
            customerArray.push(element);
          }
        });
      });
    return customerArray;
  }

  private toOrderArray() {
    return new Promise((resolve, reject) => {
      const sub = this.movieData.subscribe((movieData) => {
        resolve(movieData);
        sub.unsubscribe();
      });
    });
  }


}

