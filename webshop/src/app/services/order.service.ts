import { Injectable } from '@angular/core';
import { DataCloudService } from './data-cloud.service';
import { movieData } from '../model/data';
import { Order } from '../model/order';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable()
export class OrderService {
  order: Order;
  user: User;

  constructor(private cloudService: DataCloudService, private authService: AuthService) {
    authService.user.subscribe((user) => {
      this.user = user;
    })
  }

  createOrder(movie: movieData) {

    this.order = {
      orderDate: this.getDate(),
      uid: this.user.uid,
      
    } 
  }

  getDate() {
    let date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' 
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }
}
