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

   
   selectedMovie:movieData;

  ngOnInit() {
    this.data.currentMovieSelected.subscribe(selectedMovie=> {
      this.selectedMovie = selectedMovie;
      this.data.cartProducts.push(this.selectedMovie);
      
        console.log(this.data.cartProducts);
      
  
    });

  }


 
}
