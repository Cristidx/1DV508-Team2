import { Component, OnInit } from '@angular/core';
import { ProductDesignComponent } from '../product-design/product-design.component';
import { DataService } from '../services/data.service';
import { movieData } from '../model/data';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(private data: DataService) {}

   cartProducts = [];
   selectedMovie:movieData;

  ngOnInit() {
    this.data.currentMovieIDSelected.subscribe(selectedID=> {
      this.selectedID = selectedID;
      this.cartProducts.push(selectedID);
      
        console.log(this.cartProducts);
      
  
    });

  }


 
}
