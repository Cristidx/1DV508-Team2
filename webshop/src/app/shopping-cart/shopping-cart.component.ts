import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import {movieData} from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ DataCloudService]
})
export class ShoppingCartComponent implements OnInit {

  currentlistCheck: boolean = false;
  localCart = new Map();
  allMovies: movieData[];
  movies: movieData[];
  movie = {
    title:'',
    genre:'',
    imageURL:'',
    price:0,
    year:0,
    plot:'',
    stock:0,
    director:'',
    dateAdded:'',
    rating:'',
    id:''
  }

  allID;

  constructor(public dataCloudService: DataCloudService, private router: Router,  private data: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.data.getavgRating(this.currentlistCheck,);
    this.localCart = this.cartService.cartProducts;
    
    this.dataCloudService.getMovie().subscribe(Moviedata => { 
      this.allMovies = Moviedata;
      this.movies = this.allMovies;
    });

    this.allID = this.cartService.getCartProducts();
     console.log(this.allID);
  }


  goToOverview() {
    this.router.navigate(['/orderview']);
  }

  showCart() {
    console.log(this.localCart);
  }  
}
