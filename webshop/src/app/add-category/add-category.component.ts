import { Component, OnInit } from '@angular/core';
import { DataCloudService } from '../services/data-cloud.service';
import {categoriesData} from '../model/data';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categories: categoriesData = {
    genre:''
  }
  constructor(private dataService: DataCloudService) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.categories.genre != ''){
      this.dataService.addCategory(this.categories);
      this.categories.genre = '';
      
    }
  }
}
