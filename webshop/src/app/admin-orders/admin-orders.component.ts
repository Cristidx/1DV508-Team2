import { Component, OnInit } from '@angular/core';
import { Order } from '../model/order';
import { DataCloudService } from '../services/data-cloud.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[];
  movieOders:Order;

  currentlistCheck: boolean = false;
  constructor(private dataService: DataCloudService, private data: DataService) { }


  ngOnInit() {
    this.dataService.getOrders().subscribe( movieOrders => {
      this.orders = movieOrders ;
    });

    this.data.getavgRating(this.currentlistCheck);
  }

}
