import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { movieData } from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [DataCloudService]
})
export class ShoppingCartComponent implements OnInit {

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
  constructor(public dataCloudService: DataCloudService, private router: Router, private data: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.localCart = this.cartService.getCartProducts();
    this.totalNumber = this.cartService.getTotalNumberOfItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }


  goToOverview() {
    this.router.navigate(['/orderview']);
  }

  showCart() {
    console.log(this.localCart);
  }
  update(){
    console.log(this.totalNumber);
    this.localCart = this.cartService.getCartProducts();
    this.totalNumber = this.cartService.getTotalNumberOfItems();
    this.totalPrice = this.cartService.getTotalPrice();
  }
}
