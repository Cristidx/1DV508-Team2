import {
  Component,
  OnInit,
  AfterViewInit,
  AfterContentChecked,
  DoCheck
} from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { OrderService } from "../services/order.service";
import { DataService } from "../services/data.service";
import { Order } from "../model/order";
import { User } from "../model/user";
import { Observable } from "rxjs/Observable";
import { DataCloudService } from "../services/data-cloud.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
  providers: [OrderService]
})
export class ProfileComponent implements AfterViewInit {
  showsOrders = false;
  orders: Order[];
  currentlistCheck: boolean = false;
  user: User = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private data: DataService,
    private orderService: OrderService,
    private dataService: DataCloudService
  ) {}

  ngAfterViewInit() {
    this.authService.getCurrentlySignedInUser().subscribe(user => {
      this.user = user;
      this.orderService.getOrdersByUid(user.uid).then(orders => {
        this.orders = orders;
      });
    });
  }

  sortOrdersByDate(): void {}

  viewOrders(): void {
    this.showsOrders = true;
  }

  hideOrders(): void {
    this.showsOrders = false;
  }
}
