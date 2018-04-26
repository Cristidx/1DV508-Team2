import { Component, OnInit } from '@angular/core';
import {var1} from '../components/data-cloud/data-cloud.component';


@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css']
})
export class ProductDesignComponent implements OnInit {

  constructor() { }
  
movies = var1;
  ngOnInit() {

  }

}
