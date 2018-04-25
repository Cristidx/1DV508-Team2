import { Component, OnInit } from '@angular/core';
import { Movie } from '../model/movie';
import { CrudService } from '../services/crud.service';
import { DatabaseReference } from 'angularfire2/database';

@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css'],
  providers: [ CrudService ]
})
export class ProductDesignComponent implements OnInit {

  constructor(private crud: CrudService, private movie: Movie) {

   }

  ngOnInit() {
    this.crud.getData('prodcuts/-LAnFAJe-3_B1s0Wj3VF').subscribe((movieFromDb) => {
      movieFromDb.forEach(element => {
        console.log(element);
      });
    });
  }
}
