import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  showsOrders = false;
  currentlistCheck: boolean = false;
  constructor(private authService: AuthService, private router: Router, 
    private dialog: MatDialog, private data: DataService) { }

  ngOnInit() {
    this.data.getavgRating(this.currentlistCheck,);

  }

  viewOrders(): void {
	this.showsOrders = true;
  }
  
  hideOrders(): void {
	this.showsOrders = false;
  }

}