import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { unescapeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orders: any[];
  uid: string;
  constructor(private orderService: OrderService, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentOrderUid.subscribe(uid => {
      this.uid = uid;
      this.orders = this.orderService.getOrdersByUid(this.uid);
      console.log(this.orders);
    });
    
  }

}

