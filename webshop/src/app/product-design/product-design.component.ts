import { Component, OnInit } from '@angular/core';
import { movieData } from '../model/data';
import { DataCloudService } from '../services/data-cloud.service';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
@Component({
  selector: 'app-product-design',
  templateUrl: './product-design.component.html',
  styleUrls: ['./product-design.component.css'],
  inputs: ['movieImport']
  
})
export class ProductDesignComponent implements OnInit {


  constructor(public dataService: DataCloudService, private dialog: MatDialog) { }
  
  
  ngOnInit() {
    // this.movie = this.importMovieData.getMovieInfo();
    console.log();
     }
     deleteMovies(event,item){
      if(confirm("Want to delte the movie?")){
        this.dataService.deleteMovie(item);
      }
     else 
       return false;
    }

    openEditDialog() {
      let dialogRef = this.dialog.open(EditProductComponent, {
        height: '85%',
        width: '50%'
      });
    }
  }
