import { Component, OnInit } from '@angular/core';
import {Order} from '../model/order';
import { DataCloudService } from '../services/data-cloud.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders: Order[];

  currentlistCheck: boolean = false;
  constructor(private dataService: DataCloudService, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    this.data.getavgRating(this.currentlistCheck);
  }

  uid(item){
    this.data.updateOrderUid(item.uid);
    this.router.navigateByUrl("order-details");
  }
}
