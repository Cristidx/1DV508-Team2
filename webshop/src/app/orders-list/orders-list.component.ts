import { Component, OnInit } from "@angular/core";
import { Order } from "../model/order";
import { DataCloudService } from "../services/data-cloud.service";
import { DataService } from "../services/data.service";
import { Router } from "@angular/router";
import { OrderService } from "../services/order.service";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"],
  providers: [OrderService]
})
export class OrdersListComponent implements OnInit {
  orders: Order[];
  
  currentlistCheck: boolean = false;
  constructor(
    private dataService: DataCloudService,
    private data: DataService,
    private router: Router,
    private orderService: OrderService,
    private authSerivce: AuthService
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(orders => {
      this.orders = orders;
      this
    });
    this.data.getavgRating(this.currentlistCheck);
  }

  uid(item) {
    this.data.updateOrderUid(item.uid);
    this.router.navigateByUrl("order-details");
  }
}
