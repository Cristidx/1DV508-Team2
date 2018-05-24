import { Injectable } from '@angular/core';
import { DataCloudService } from './data-cloud.service';
import { movieData } from '../model/data';
import { Order, Status } from '../model/order';
import { AuthService } from './auth.service';
import { User } from '../model/user';
import { Address } from '../model/address';

@Injectable()
export class OrderService {
  constructor(private cloudService: DataCloudService, private authService: AuthService) {
    
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
    let ordersByCustomer = [];
    this.cloudService.getOrders().subscribe(orders => {
      orders.forEach((order, i) => {
        if (order.uid === uid) {
          ordersByCustomer.push(order);
        }
      });
    });
    console.log(ordersByCustomer + '  ' + uid);
    return ordersByCustomer;
  }

  getDate(): string {
    let date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' 
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
