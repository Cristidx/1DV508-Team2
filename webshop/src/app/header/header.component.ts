import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {AddCategoryComponent} from '../add-category/add-category.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  private signOut() {
    this.authService.signOut();
  }
}

