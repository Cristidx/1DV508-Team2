import { Injectable, OnInit } from '@angular/core';
import { DataCloudService } from './data-cloud.service';
import { movieData } from '../model/data';
import { Order, Status } from '../model/order';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Address } from '../model/address';
import { DataService } from './data.service';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class OrderService {

  itemsFromOrder: any[];
  orderCollection: AngularFirestoreCollection<Order>;
  orders: Observable<Order[]>;
  constructor(private dataService: DataService, private cloudService: DataCloudService, public afs: AngularFirestore,
    private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {

    this.orderCollection = this.afs.collection('Orders', ref => ref.orderBy('orderDate', 'desc'));
    this.orders = this.orderCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Order;
        data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getOrders() {
    return this.orders;
  }

  editOrder(data: Order) {
    const orderDoc = this.afs.doc(`Orders/${data.id}`);
    orderDoc.update(data).then(() => this.snackBar.open('An order was successfully updated', 'Dismiss', { duration: 3000 }), console.error);
  }

  sendOrder(order: Order, saveAddress: boolean) {
    if (saveAddress) {
      this.authService.saveUserAddress(order.address);
    } else {
      this.authService.setUserAddressEmpty();
    }
    console.log(order);
    return this.orderCollection.add(order).then(() => this.router.navigateByUrl('/'));
  }

  async getOrdersByUid(uid: string) {
    let customerArray: Order[] = [];
    this.toOrderArray()
      .then((orders: Order[]) => {
        orders.forEach(element => {
          if (element.uid === uid) {
            customerArray.push(element);
          }
        });
      });
    return customerArray;
  }

  private toOrderArray() {
    return new Promise((resolve, reject) => {
      const sub = this.orders.subscribe((orders) => {
        resolve(orders);
        sub.unsubscribe();
      });
    });
  }
}
