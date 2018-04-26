import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataCloudService } from '../services/data-cloud.service';
import {categoriesData} from '../model/data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  categories: categoriesData[];
  constructor(private dataService: DataCloudService, private authService: AuthService) { }
 

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      console.log(Catdata);
      this.categories = Catdata;
    });
  }

  private signOut() {
    this.authService.signOut();
  }
}
