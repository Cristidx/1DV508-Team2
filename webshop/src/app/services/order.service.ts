import { Injectable, OnInit } from '@angular/core';
import { DataCloudService } from './data-cloud.service';
import { movieData } from '../model/data';
import { Order, Status } from '../model/order';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Address } from '../model/address';
import { DataService } from './data.service';

@Injectable()
export class OrderService {

  orders: Order[];

  constructor(private dataService: DataService, private cloudService: DataCloudService, private authService: AuthService) {
    
  }

  updateOrder(order) {
    this.cloudService.editOrder(order);
  }

  sendOrder(order: Order, saveAddress: boolean) {
    if (saveAddress) {
      this.authService.saveUserAddress(order.address);
    } else {
      this.authService.setUserAddressEmpty();
    }
    return this.cloudService.addOrder(order);
  }

  getOrdersByUid(uid: string) {
    this.orders = this.dataService.getOrders();
    let customerOrders: Order[] = [];
    for (let i = 0; i < this.orders.length; i++) {
      if (this.orders[i].uid === uid) {
        customerOrders.push(this.orders[i]);
      }
    }
    return customerOrders;
  }

  getDate(): string {
    let date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + ' ' 
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  getTotalPrice(movies: movieData[]): number {
    let totalprice: number;
    movies.forEach(movie => {
      totalprice += movie.price;
    });
    return totalprice;
  }
}
