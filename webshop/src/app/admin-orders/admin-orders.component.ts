import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { DataCloudService } from '../services/data-cloud.service';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
  providers: [DataCloudService]
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];

  constructor(private dataService: DataCloudService) { }

  ngOnInit() {
    this.dataService.getOrders().subscribe(orders => {
      this.orders = orders;
    });
  }
}
