import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interface/order';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orderList: Order[];
  showHide: Boolean; 
  private ngUnsubscribe = new Subject();

  private shipOrder(index) {
    const fd = new FormData();

    fd.append('query', JSON.stringify({ orderId: this.orderList[index].orderId}));
    fd.append('value', JSON.stringify({ isShipped: !this.orderList[index].isShipped}));

    this.orderService.updateOrder(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      alert(res['message']);
      this.getOrder();
    }, error => {
      alert(error.error.message);
    });
  }

  private getOrder() {
    this.orderService.getOrder().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if(data) {
        this.showHide = false;
        this.orderList = data;
      }
      else if(!data) {
        this.showHide = true;
      }
    }, err => {
      if(err) {
        console.log(err);
        this.router.navigate(['/']);
      }
    });
  }

  private getOrderByValue(fd) {
    this.orderService.getOrderByValue(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if(data) {
        this.showHide = false;
        this.orderList = data;
      }
      else if(!data) {
        this.orderList = null;
        this.showHide = true;
      }
    }, err => {
      if(err) {
        console.log(err);
        this.router.navigate(['/']);
      }
    });
  }

  search(event) {
    var target = event.target;
    var value = target.value;
    
    const fd = new FormData();
    fd.append('value', value);
    
    if(value == "") {
      this.getOrder();
    }
    else {
      this.getOrderByValue(fd);
    }
  }

  constructor(private orderService: OrderService, private router :Router) { }

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
