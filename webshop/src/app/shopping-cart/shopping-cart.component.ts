import { Component, OnInit } from '@angular/core';
import { ProductDesignComponent } from '../product-design/product-design.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor( private data: DataService) {}

   cartProducts = [];
   selectedID:string;

  ngOnInit() {
    this.data.currentMovieIDSelected.subscribe(selectedID=> {
      this.selectedID = selectedID;
    });
    
  }


 
}
