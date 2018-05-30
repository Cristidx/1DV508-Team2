import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { movieData, categoriesData } from '../model/data';
import { DataService } from '../services/data.service';
import { DataCloudService } from '../services/data-cloud.service';
import { ProductDesignComponent } from '../product-design/product-design.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [DataCloudService]
})
export class EditProductComponent implements OnInit {

  selectedGenre:string;
  genres: categoriesData[];
  selected: any;
  //movie: movieData;
  movie: movieData;
 
  checked = false;
  disabled = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: movieData, public dataService: DataCloudService,
                                       public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(data => {
      console.log(data);
      this.genres = data;
    });
    this.movie = this.data;
    this.checked = this.movie.DOTDstatus;
    
  }

  onSubmit() {
    this.movie.DOTDstatus = this.checked;
    this.dataService.editMovie(this.movie);
    this.dialog.closeAll();
  }

  sendValue() {
    this.movie.DOTDstatus=this.checked;
    console.log("qwe" + this.checked);
  }

}
