import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { movieData } from '../model/data';
import { categoriesData } from '../model/data';
import { Order } from '../model/order';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class DataCloudService {

  categoriesCollection: AngularFirestoreCollection<categoriesData>
  categoriesData: Observable<categoriesData[]>
  categoryDoc: AngularFirestoreDocument<categoriesData>;

  movieCollection: AngularFirestoreCollection<movieData>
  movieData: Observable<movieData[]>
  movieDoc: AngularFirestoreDocument<movieData>;
  
  orderCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(public afs: AngularFirestore, private snackBar: MatSnackBar) {

    //this.movieData = this.afs.collection('Movies').valueChanges();
    this.movieCollection = this.afs.collection('Movies', ref => ref.orderBy('dateAdded', 'desc'));
    this.movieData =this.movieCollection.snapshotChanges().map(changes => {
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

    this.orderCollection = this.afs.collection('Orders');
    this.orders = this.orderCollection.snapshotChanges().map(changes => {
      return changes.map(a => { 
        const data = a.payload.doc.data() as Order;
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
  getOrders() {
    return this.orders;
  }

  addProduct(movieData: movieData) {
    this.movieCollection.add(movieData).then(()=>this.snackBar.open('A movie was succesfully added', 'Dismiss'),console.error);
  }
  addCategory(categoriesData: categoriesData) {
    this.categoriesCollection.add(categoriesData).then(()=>this.snackBar.open('A category was succesfully created', 'Dismiss'), console.error);
  }
  addOrder(order: Order) {
    return this.orderCollection.add(order).then(() => this.snackBar.open('Order created', 'Dismiss'));
  }
   /* To delete categories */
  deleteCategory(categoriesData: categoriesData) {
    this.categoryDoc=this.afs.doc(`Categories/${categoriesData.id}`);
    this.categoryDoc.delete().then(()=>this.snackBar.open('A category was successfully deleted', 'Dismiss'), console.error);
  }
  /* To delete movies item by id */
  deleteMovie(movieData: movieData) {
    this.movieDoc = this.afs.doc(`Movies/${movieData.id}`);
    this.movieDoc.delete().then(()=>this.snackBar.open('A movie was successfully deleted', 'Dismiss'), console.error); 
  }

  editMovie(data: movieData) {
    console.log('Data ID ' + data.id);
    this.movieDoc = this.afs.doc(`Movies/${data.id}`);
    this.movieDoc.update(data).then(()=>this.snackBar.open('A movie was successfully updated', 'Dismiss'), console.error);
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

