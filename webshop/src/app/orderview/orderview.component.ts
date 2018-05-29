import { Component, OnInit } from '@angular/core';
import { Order, Status } from '../model/order';
import { AuthService } from '../services/auth.service';
import { movieData } from '../model/data';
import { Address } from '../model/address';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { DataCloudService } from '../services/data-cloud.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.css']
})
export class OrderviewComponent implements OnInit {

  currentlistCheck: boolean = false;
  localCart: any[];
  totalNumber: number;
  totalPrice: number;

  movie = {
    title: '',
    genre: '',
    imageURL: '',
    price: 0,
    year: 0,
    plot: '',
    stock: 0,
    director: '',
    dateAdded: '',
    rating: '',
    id: ''
  }

  tempQuantity: number = 3;


  checked = true;
  constructor(public dataCloudService: DataCloudService, private data: DataService, private authService: AuthService, private orderService: OrderService,
    private router: Router, private cart: CartService, private cloudSerivce: DataCloudService, private cartService: CartService) { }

    mockMovies: movieData[] = [];
    address: Address = {
      street: '',
      city: '',
      zipCode: '',
      phoneNumber: ''
    }
    order: Order;

  ngOnInit() {
    this.localCart = this.cartService.getCartProducts();
    this.totalNumber = this.cartService.getTotalNumberOfItems();
    this.totalPrice = this.cartService.getTotalPrice();

    this.authService.getCurrentlySignedInUser().subscribe(user => {
      if (user.address != null) {
        this.address = user.address;
      }
    });
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
    
    return new Promise((resolve) => { this.cloudSerivce.getMovieFromIDs(ids)
      .then((movies: movieData[]) => { 
        movies.forEach(movie => {
            totalPrice += (movie.price * items[index].value);
            index++;
        });
        resolve(totalPrice);
      });
    })
  }

  showCart() {
    console.log(this.localCart);
  }
}
