import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  currentlistCheck: boolean = false;
  localCart = new Map();
  constructor(private router: Router,  private data: DataService, private cartService: CartService) { }

  ngOnInit() {
    this.data.getavgRating(this.currentlistCheck,);
    this.localCart = this.cartService.cartProducts;
    
  }


  goToOverview() {
    this.router.navigate(['/orderview']);
  }

  showCart() {
    console.log(this.localCart);
  }  
}
