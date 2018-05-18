import { Injectable } from '@angular/core';
import { movieData } from '../model/data';
import { AuthService } from './auth.service';

@Injectable()
export class CartService {

  constructor(private auth: AuthService) { }

  cartProducts = [];


  addMovieToCart(movie: movieData) {
    if(this.auth.user != null && movie.stock > 0) {
      this.cartProducts.push(movie);
    }
    console.log(this.cartProducts);
  }

}
