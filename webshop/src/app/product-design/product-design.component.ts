import { Component, OnInit } from '@angular/core';
import { movieData } from '../model/data';


@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css'],
  inputs: ['movieImport']
  
})
export class ProductDesignComponent implements OnInit {


  constructor() { }
  
  
  ngOnInit() {
    // this.movie = this.importMovieData.getMovieInfo();
    console.log();
     }
  }
