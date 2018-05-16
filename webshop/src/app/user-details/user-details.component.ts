import { Component, OnInit } from '@angular/core';
import { DataCloudService } from '../services/data-cloud.service';
import { Order } from '../model/order';
import { DataService } from '../services/data.service';
import { OrderData } from '../model/data';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
  providers: [DataCloudService]
})
export class UserDetailsComponent implements OnInit {


  orders: Order[]

  constructor(public dataService: DataCloudService, private data: DataService, public orderData: OrderData) {  }

  ngOnInit() {
    this.dataService.getOrders().subscribe(OrderData => {
      this.orders = OrderData;
    }); 
  }
}