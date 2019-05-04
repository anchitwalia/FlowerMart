import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../interface/Order';
import { OrderService } from '../services/order.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cusorder',
  templateUrl: './cusorder.component.html',
  styleUrls: ['./cusorder.component.css']
})
export class CusorderComponent implements OnInit, OnDestroy {

  orderList: Order[];
  showHide: Boolean;
  private ngUnsubscribe = new Subject();

  getOrder() {
    const fd = new FormData();
    fd.append('value', localStorage.getItem('userName'));
    this.orderService.getOrderByValue(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res) {
        this.orderList = res;
        this.showHide = false;
      }
      else if(!res) {
        this.orderList = null;
        this.showHide = true;
      }
    }, err => {
      if(err) {
        console.log(err);
      }
    })
  }

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
