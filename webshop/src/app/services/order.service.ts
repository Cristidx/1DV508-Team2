import { Injectable } from '@angular/core';
import { DataCloudService } from './data-cloud.service';
import { movieData } from '../model/data';
import { Order, Status } from '../model/order';
import { AuthService } from './auth.service';
import { User } from '../model/user';

@Injectable()
export class OrderService {
  order: Order;

  constructor(private cloudService: DataCloudService, private authService: AuthService) {

  }

  createOrder(movie: movieData) {
    let movies = [movie];
    this.order = {
      orderDate: this.getDate(),
      uid: this.authService.uid,
      items: movies,
      status: Status.New,
      price: movie.price
    } 
    this.cloudService.addOrder(this.order);
  }

  getDate() {
    let date = new Date();
    return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDay() + ' ' 
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  getTotalPrice() {

  }

}
