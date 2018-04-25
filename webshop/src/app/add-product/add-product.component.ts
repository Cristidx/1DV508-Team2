import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CrudService } from '../services/crud.service';
import { Movie } from '../model/movie';
import { $ } from 'protractor';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  movie = {
    title: '',
    plot: '',
    price: '',
    genre: 'Horror',
    year: '',
    imgUrl: ''
  };

  constructor(private authService: AuthService, private crud: CrudService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.crud.create(this.movie, 'products');
  }
}
