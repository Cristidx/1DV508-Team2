import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  currentlistCheck: boolean = false;

  constructor(private router: Router,  private data: DataService) { }

  ngOnInit() {
    this.data.getavgRating(this.currentlistCheck,);
  }












  goToOverview() {
    this.router.navigate(['/orderview']);
  }
}
