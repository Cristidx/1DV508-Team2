import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { unescapeIdentifier } from '@angular/compiler';
import { DataCloudService } from '../services/data-cloud.service';
import { Order, Status } from '../model/order';
import { Address } from '../model/address';
import { element } from 'protractor';
import { User } from '../model/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]
})
export class OrderDetailsComponent implements OnInit {
  id: string;
  orderDate: string;
  addres: Address;
  price: number;
  item: any[];
  order: Order; /* to modify the oder */
  orders: Order[];
  user: User;
  status: Status;
  uid: string;
  constructor(
    private orderService: OrderService,
    private dataService: DataService,
    private cloudService: DataCloudService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.dataService.currentOrderUid.subscribe(uid => {
      this.authService.getUserByUid(uid).then(data => {
        this.user = data;
        this.orderService
        .getOrdersByUid(this.user.uid)
        .then(orders => {
          this.orders = orders;
        })
        .catch(error => console.log(error));
      });
    });

  }

  onSubmit() {
    this.orders.forEach(element => {
      this.uid = element.uid;
      this.orderDate = element.orderDate;
      this.addres = element.address;
      this.item = element.items;
      this.status = element.status;
      this.price = element.price;
      this.id = element.id;
      this.order = {
        uid: this.uid,
        orderDate: this.orderDate,
        address: this.addres,
        items: this.item,
        status: this.status,
        price: this.price,
        id: this.id
      };
      this.orderService.editOrder(this.order);
    });

    console.log(this.order.id);
    console.log(this.id);
    console.log(this.orders);
    console.log(this.order);
  }
}
