import { Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { movieData } from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../model/user';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { DataService } from '../services/data.service';
import { OrderService } from '../services/order.service';
import { Observable } from '@firebase/util';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css'],
  providers: [DataCloudService, AuthService, OrderService]
})
export class ProductDesignComponent implements OnInit {


  constructor(public dataService: DataCloudService, private dialog: MatDialog, 
              private route: ActivatedRoute, private authService: AuthService,
              private data: DataService, private orderService: OrderService) { }

  message: string;
  user: User;              
  isDataAvailabe: boolean = false;
  movieArray: movieData[];
  movie: movieData = {
    title:'',
    genre:'',
    imageURL:'',
    price:0,
    year:0,
    plot:'',
    stock: 0,
    director:'',
    dateAdded:'',
    id: ''
  }

  qwe: string ='RCn6upR27BH3IyRSMRZr';
  ngOnInit() {
    // this.movie = this.importMovieData.getMovieInfo();
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    
    this.dataService.getMovie().subscribe((movies) => {  
      this.movieArray = movies;
      this.route.params.subscribe(() => this.handleRouteChange());
    });
  
  }

  handleRouteChange() {
    let id = this.route.snapshot.paramMap.get('id');
    for (let i = 0; i < this.movieArray.length; i++) {
      if (this.movieArray[i].id === id) {
        this.movie = this.movieArray[i];
        this.movie.id = this.movieArray[i].id;
        window.scrollTo(0, 0);
        break;
      }
    }
  }

  deleteMovies(event,item){
    if(confirm("Do you want to delete the movie?")){
      this.dataService.deleteMovie(item);
    }
    else 
      return false;
  }

  openEditDialog() {
    let dialogRef = this.dialog.open(EditProductComponent, {
      data: this.movie,
      width: '35%'
    });
  }

  testOrderFunction() {
    this.orderService.createOrder(this.movie);  
  }

  addToCart() {
   // console.log(this.movie.id)
    if(this.movie.stock > 0 && this.user !=null) {
      this.data.getCurrentMovieID(this.movie.id);
      
    }
  }
}
