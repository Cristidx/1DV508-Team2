import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { Order } from '../model/order';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [OrderService]
})
export class ProfileComponent implements OnInit {

  showsOrders = false;
  uid: string;
  orders: Order[];
  currentlistCheck: boolean = false;
  
  constructor(private authService: AuthService, private router: Router, private data: DataService, private orderService: OrderService) { }

  ngOnInit() {
	this.data.getavgRating(this.currentlistCheck,);
  }

  viewOrders(): void {
	this.showsOrders = true;
	this.getOrders();
  }
  
  hideOrders(): void {
	this.showsOrders = false;
  }
  
  getOrders(): void {
	this.uid = this.authService.getUid();
	this.orders = this.orderService.getOrdersByUid(this.uid);
  }

}