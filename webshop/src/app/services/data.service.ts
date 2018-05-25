import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Order } from '../model/order';

@Injectable()
export class DataService {

  orderDummy: Order[] = [];

  private headerGenre = new BehaviorSubject<string>('');
  currentHeaderGenreSelected = this.headerGenre.asObservable();

  private movieID = new BehaviorSubject<string>('');
  currentMovieIDSelected = this.movieID.asObservable();

  private listCheck = new BehaviorSubject<boolean>(true);
  currentListCheck  = this.listCheck.asObservable();

  private searchTarget = new BehaviorSubject<string>('');
  currentSearchTarget = this.searchTarget.asObservable();

  private orderUid = new BehaviorSubject<string>('');
  currentOrderUid = this.orderUid.asObservable();

  private orders = new BehaviorSubject<Order[]>(this.orderDummy);
  currentOrders = this.orders.value;

  private totalNumberOfItems = new BehaviorSubject<number>(0);
  currentTotalNumOfItems = this.totalNumberOfItems.asObservable();
  constructor() { }

  changeHeaderGenre(selectedGenre: string) {
    this.headerGenre.next(selectedGenre);
  }

  getCurrentMovieID(selectedID: string) {
    this.movieID.next(selectedID);
  }

  getavgRating(selectedListCheck: boolean) {
    this.listCheck.next(selectedListCheck);
  }

  updateSearchTarget(newSearchTarget: string) {
    this.searchTarget.next(newSearchTarget);
  }

  updateOrderUid(newUid: string) {
    this.orderUid.next(newUid);
  }

  updateOrders(orders: Order[]) {
    this.orders.next(orders);
  }

  updateItems(number) {
    this.totalNumberOfItems.next(number);
  }

  getOrders() {
    console.log(this.orders.value);
    return this.orders.value;
  }
}

