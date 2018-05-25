import { Injectable } from '@angular/core';
import { movieData } from '../model/data';
import { AuthService } from './auth.service';

@Injectable()
export class CartService {

  constructor(private auth: AuthService) { }
  
  cartProducts = new Map();
  counter: number = 1;

  addMovieToCart(movie: movieData) {
    if(this.auth.user != null && !this.cartProducts.has(movie.id) ) {
      console.log(movie.stock);
      if(movie.stock >= 1) {
        this.cartProducts.set(movie.id, 1);
      }
    } else {
      let numOfmovies = this.cartProducts.get(movie.id);
      if(movie.stock >= ++numOfmovies) {
        this.cartProducts.set(movie.id, numOfmovies);
      }
      this.getTotalNumberOfItems();
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
    console.log('tots ' + tots);
    return tots;
  }

}
