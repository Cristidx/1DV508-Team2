import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { movieData } from '../model/data';
import { categoriesData } from '../model/data';
import { Order } from '../model/order';

@Injectable()
export class DataCloudService {

  categoriesCollection: AngularFirestoreCollection<categoriesData>
  categoriesData: Observable<categoriesData[]>
  categoryDoc: AngularFirestoreDocument<categoriesData>;

  movieArray: movieData[];
  movieCollection: AngularFirestoreCollection<movieData>
  movieData: Observable<movieData[]>
  movieDoc: AngularFirestoreDocument<movieData>;
  
  orderCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;

  constructor(public afs: AngularFirestore) {

    //this.movieData = this.afs.collection('Movies').valueChanges();
    this.movieCollection = this.afs.collection('Movies', ref => ref.orderBy('dateAdded', 'desc'));
    this.movieData =this.movieCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as movieData;
        data.id = a.payload.doc.id;
        return data;
      });
    });

    this.movieArray = [];
    this.movieCollection.ref.get().then(querySnapshot => {
      querySnapshot.forEach((doc) => {
        let data: movieData = {
          title: doc.data()['title'],
          genre: doc.data()['genre'],
          imageURL: doc.data()['imageURL'],
          price: doc.data()['price'],
          year: doc.data()['year'],
          plot: doc.data()['plot'],
          stock: doc.data()['stock'],
          director: doc.data()['director'],
          dateAdded: doc.data()['dateAdded'],
          id: doc.id
        }
        this.movieArray.push(data);
      })
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
        data.uid = a.payload.doc.id;
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
    this.movieCollection.add(movieData).then(()=>window.alert('A film is successfully added'),console.error);
  }
  addCategory(categoriesData: categoriesData) {
    this.categoriesCollection.add(categoriesData).then(()=>window.alert('A category is successfully Added'),console.error);
  }
  addOrder(order: Order) {
    return this.orderCollection.add(order);
  }
   /* To delete categories */
  deleteCategory(categoriesData: categoriesData) {
    this.categoryDoc=this.afs.doc(`Categories/${categoriesData.id}`);
    this.categoryDoc.delete().then(()=>window.alert('A category is successfully deleted'),console.error);
  }
  /* To delete movies item by id */
  deleteMovie(movieData: movieData) {
    this.movieDoc = this.afs.doc(`Movies/${movieData.id}`);
    this.movieDoc.delete().then(()=>window.alert('A movie is Successfully deleted')).then(()=>location.reload(),console.error);
  
  }

  editMovie(data: movieData) {
    console.log('Data ID ' + data.id);
    this.movieDoc = this.afs.doc(`Movies/${data.id}`);
    this.movieDoc.update(data).then(()=>window.alert('A movie is Successfully updated'),console.error);
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

