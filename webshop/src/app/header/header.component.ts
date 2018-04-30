import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataCloudService } from '../services/data-cloud.service';
import { categoriesData } from '../model/data';
import { AddCategoryComponent } from '../add-category/add-category.component'
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;
  categories: categoriesData[];
  constructor(private dataService: DataCloudService,private authService: AuthService) { }

  ngOnInit() {
    this.dataService.getCategories().subscribe(Catdata => {
      this.categories = Catdata;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    })
  }
  private signOut() {
    this.authService.signOut();   
  }
}
