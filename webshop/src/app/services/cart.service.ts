import { Injectable } from '@angular/core';
import { movieData } from '../model/data';
import { AuthService } from './auth.service';

@Injectable()
export class CartService {

  constructor(private auth: AuthService) { }

  cartProducts = new Map();
  counter: number = 1;

  addMovieToCart(movie: movieData) {
    if(this.auth.user != null && !this.cartProducts.has(movie) ) {
      this.cartProducts.set(movie.id,this.counter); 
    } else {
      let numOfmovies = this.cartProducts.get(movie);
      if(movie.stock >= ++numOfmovies) {
      this.cartProducts.set(movie.id, numOfmovies);
      }
    }
  }

}
