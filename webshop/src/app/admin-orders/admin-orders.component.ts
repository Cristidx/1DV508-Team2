import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { DataCloudService } from '../services/data-cloud.service';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  movieOders:Order;

  constructor(private dataService: DataCloudService) { }

  ngOnInit() {
    this.dataService.getOrders().subscribe( movieOrders => {
      this.orders = movieOrders ;
    });
  }

}
