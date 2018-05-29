import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order, Status } from '../model/order';
import { AuthService } from '../services/auth.service';
import { movieData } from '../model/data';
import { Address } from '../model/address';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DataCloudService } from '../services/data-cloud.service';
import { User } from '../model/user';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.ceomponent.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent implements OnInit, AfterViewInit {
  mockMovies: movieData[] = [];
  address: Address = {
    street: '',
    city: '',
    zipCode: '',
    phoneNumber: ''
  }
  order: Order;
  checked = true;
  constructor(private authService: AuthService, private orderService: OrderService,
    private router: Router, private cart: CartService, private cloudSerivce: DataCloudService) { }

  ngOnInit() {
    console.log('OrderView ngOnInit called');   
    this.authService.getCurrentlySignedInUser().subscribe(user => {
      let tempUser = <any>user;
      console.log(tempUser);
      if (tempUser.city != null) {
        this.address.city = tempUser.city;
      }
      if (tempUser.zipCode != null) {
        this.address.zipCode = tempUser.zipCode;
      }
      if (tempUser.street != null) {
        this.address.street = tempUser.street;
      }
      if (tempUser.phoneNumber != null) {
        this.address.phoneNumber = tempUser.phoneNumber;
      }
    });
  }

  ngAfterViewInit() {
    
  }

  createOrder() {
    if (this.address.phoneNumber === '' || this.address.city === '' ||
      this.address.street === '' || this.address.zipCode === '') { return; }

    const cart = this.cart.getCartProducts();
    const date: Date = new Date();
    const price = this.getTotalPrice(cart)
      .then((price: number) => {
        this.order = {
          orderDate: this.cloudSerivce.getDate(date),
          uid: this.authService.getUid(),
          items: cart,
          status: Status.New,
          price: price,
          address: this.address
        }
        this.orderService.sendOrder(this.order, this.checked);
        /* the cart need to be clear and redirect to the main or other page*/
        this.cart.clearCart();
      });
  }

  getMovieIDs(movies: movieData[]) {
    let movieIDs: string[];
    movies.forEach((value) => {
      movieIDs.push(value.id);
    });
    return movieIDs;
  }

  getTotalPrice(items: any[]) {
    let index = 0;
    let totalPrice = 0;
    const ids: string[] = [];
    items.forEach((element) => { ids.push(element.key) });

    return new Promise((resolve) => {
      this.cloudSerivce.getMovieFromIDs(ids)
        .then((movies: movieData[]) => {
          movies.forEach(movie => {
            totalPrice += (movie.price * items[index].value);
            index++;
          });
          resolve(totalPrice);
        });
    })
  }
}
