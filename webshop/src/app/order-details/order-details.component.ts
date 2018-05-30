import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from '../services/order.service';
import { DataService } from '../services/data.service';
import { unescapeIdentifier } from '@angular/compiler';
import { DataCloudService } from '../services/data-cloud.service';
import { Order, Status } from '../model/order';
import { Address } from '../model/address';
import { element } from 'protractor';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [OrderService]
})
export class OrderDetailsComponent implements OnInit {
  
  id: string;
  orderDate: string;
  addres: Address;
  price: number;
  item: any[];
  order: Order;/* to modify the oder */
  orders: Order[];
  uid: string;
  status:Status;
  constructor(
    private orderService: OrderService, 
    private dataService: DataService, 
    private cloudService: DataCloudService
    ) {  }

  ngOnInit() {
    this.dataService.currentOrderUid.subscribe(uid => {
      console.log(uid);
      this.uid = uid;
    });
    this.orderService.getOrdersByUid(this.uid)
      .then((orders) => {
        this.orders = orders;
      })
      .catch((error) => console.log(error));
     
  }

  onSubmit() {
   
   this.orders.forEach(element => {
    this.order={
      uid:this.uid,
      orderDate:this.orderDate,
      address:this.addres,
      items:this.item,
      status:this.status,
      price:this.price,
      id:this.id
    };
      this.uid=element.uid;
      this.orderDate=element.orderDate;
      this.addres=element.address;
      this.item=element.items;
      this.status=element.status;
      this.price=element.price;
      this.id=element.id;

      
      });
      
   console.log(this.order.id);
   console.log(this.id);
   console.log(this.orders);
   console.log(this.order);
   this.orderService.editOrder(this.order);
  }
}
