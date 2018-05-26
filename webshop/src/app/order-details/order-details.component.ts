import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { unescapeIdentifier } from '@angular/compiler';
import { DataCloudService } from '../services/data-cloud.service';
import { Order, Status } from '../model/order';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[];
  uid: string;
  constructor(private orderService: OrderService, private dataService: DataService, private cloudService: DataCloudService) {

  }

  ngOnInit() {
    this.dataService.currentOrderUid.subscribe(uid => {
      this.uid = uid;
    });
    this.orderService.getOrdersByUid(this.uid)
      .then((orders) => {
        this.orders = orders;
      })
      .catch((error) => console.log(error));
  }

  onSubmit() {

  }
}
