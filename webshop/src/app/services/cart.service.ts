import { Injectable } from '@angular/core';
import { movieData } from '../model/data';
import { AuthService } from './auth.service';
import { Observable } from '@firebase/util';
import { DataService } from './data.service';
import { DataCloudService } from './data-cloud.service';

@Injectable()
export class CartService {

  constructor(private auth: AuthService, private dataService: DataService,
    private cloudService: DataCloudService) { }

  cartProducts = new Map();
  counter = 0;

  addMovieToCart(movie: movieData) {
    if (this.auth.user != null && !this.cartProducts.has(movie.id)) {
      if (movie.stock >= 1) {
        this.counter++;
        this.dataService.updateItems(this.counter);
        let cartMovie = {
          movie: movie,
          numOfmovies: 1
        }
        this.cartProducts.set(movie.id, cartMovie);
      }
    } else {
      let cartMovie = this.cartProducts.get(movie.id);
      if (movie.stock >= (cartMovie.numOfmovies + 1)) {
        cartMovie.numOfmovies++;
        this.counter++;
        this.dataService.updateItems(this.counter);
        this.cartProducts.set(movie.id, cartMovie);
      }
    }
  }

  setValueCartItem(movie: movieData, numOfmovies) {
    if (this.auth.user != null && !this.cartProducts.has(movie.id)) {
      this.cartProducts.set(movie.id, numOfmovies);
    }
  }

  getCartProducts() {
    const movies: any[] = [];
    this.cartProducts.forEach((value, key) => {
      movies.push(value);
    });
    return movies;
  }

  getTotalPrice() {
    let totalPrice = 0;
    this.cartProducts.forEach((value, key) => {
      totalPrice += (value.movie.price * value.numOfmovies);
    });
    return totalPrice;
  }

  getTotalNumberOfItems() {
    let tots = 0;
    this.cartProducts.forEach((value, key) => {
      tots += value.numOfmovies;
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
  deleteMovieFromCart(item){
    if (this.auth.user != null && this.cartProducts.size > 0) {
      /* Just delete  cart*/
      let cartMovie = this.cartProducts.get(item.id);
      cartMovie.numOfmovies--;
      cartMovie.movie.price=0;
      this.counter--;
      this.cartProducts.delete(cartMovie);
      console.log(cartMovie);
   }
  }

 

}
