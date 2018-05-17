import { Component, OnInit } from '@angular/core';
import { Order, Status } from '../model/order';
import { AuthService } from '../services/auth.service';
import { movieData } from '../model/data';
import { Address } from '../model/address';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent implements OnInit {

  checked = true;
  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentlySignedInUser().subscribe(user => {
      if (user.address != null) {
        this.address = user.address;
      } 
    });
  }

  mockMovies: movieData[] = [];
  address: Address = {
    street: '',
    city: '',
    zipCode: '',
    phoneNumber: ''
  }
  order: Order;
  createOrder() {
    if (this.address.phoneNumber === '' || this.address.city === '' ||
      this.address.street === '' || this.address.zipCode === '') { return; }

    this.order = {
      orderDate: this.orderService.getDate(),
      uid: this.authService.getUid(),
      items: [],
      status: Status.New,
      price: 10,
      address: this.address
    } 
    this.orderService.sendOrder(this.order, this.checked);
  }

  getMovieIDs(movies: movieData[]) {
    let movieIDs: string[];
    movies.forEach((value) => {
      movieIDs.push(value.id);
    });
    return movieIDs;
  }
}
