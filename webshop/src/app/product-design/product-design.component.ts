import { Component, OnInit } from '@angular/core';
import { movieData } from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css']
})
export class ProductDesignComponent implements OnInit {


  constructor(public dataService: DataCloudService, private dialog: MatDialog, private route: ActivatedRoute) { }

  isDataAvailabe: boolean = false;
  movieArray: movieData[];
  movie: movieData = {
    title:'',
    genre:'',
    imageURL:'',
    price:0,
    year:0,
    plot:'',
    stock:0,
    director:'',
    dateAdded:'',
    id: ''
  }
  
  ngOnInit() {
    // this.movie = this.importMovieData.getMovieInfo();
      this.movieArray = this.dataService.getMovies();
      this.route.params.subscribe(param => this.handleRouteChange(param));
    }

    handleRouteChange(param) {
      let id = this.route.snapshot.paramMap.get('id');
      for (let i = 0; i < this.movieArray.length; i++) {
        if (this.movieArray[i].id === id) {
          this.movie = this.movieArray[i];
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
        
        width: '35%'
      });
    }
  }
