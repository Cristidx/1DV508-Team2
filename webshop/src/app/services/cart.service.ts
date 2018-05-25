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
      console.log(this.cartProducts.get(movie.id));
      if(movie.stock >= ++numOfmovies) {
        this.cartProducts.set(movie.id, numOfmovies);
      }
      console.log(this.cartProducts.get(movie.id));
      console.log(this.cartProducts);
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

}
