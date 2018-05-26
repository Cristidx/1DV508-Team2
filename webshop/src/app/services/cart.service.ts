import { Injectable } from '@angular/core';
import { movieData } from '../model/data';
import { AuthService } from './auth.service';
import { Observable } from '@firebase/util';
import { DataService } from './data.service';

@Injectable()
export class CartService {

  constructor(private auth: AuthService, private dataService: DataService) { }

  cartProducts = new Map();
  counter = 0;

  addMovieToCart(movie: movieData) {
    if (this.auth.user != null && !this.cartProducts.has(movie.id)) {
      if (movie.stock >= 1) {
        this.counter++;
        this.dataService.updateItems(this.counter);
        this.cartProducts.set(movie.id, 1);
      }
    } else {
      let numOfmovies = this.cartProducts.get(movie.id);
      if (movie.stock >= ++numOfmovies) {
        this.counter++;
        this.dataService.updateItems(this.counter);
        this.cartProducts.set(movie.id, numOfmovies);
      }
      this.getTotalNumberOfItems();
    }
  }

  setValueCartItem(movie: movieData, numOfmovies) {
    if (this.auth.user != null && !this.cartProducts.has(movie.id)) {
      this.cartProducts.set(movie.id, numOfmovies);
    }
  }

  getCartProducts() {
    let cart = [];
    this.cartProducts.forEach((value, key) => {
      let keyValue = {
        key: key,
        value: value
      }
      cart.push(keyValue);
    })
    return cart;
  }

  getTotalNumberOfItems() {
    let tots = 0;
    this.cartProducts.forEach((value, key) => {
      tots += value;
    });
    return tots;
  }

  clearCart() {
    if (this.auth.user != null && this.cartProducts.size > 0) {
      this.cartProducts.clear();
      this.counter = 0;
      this.dataService.updateItems(this.counter);
    }
  }
}
