import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Order } from '../interface/Order';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-shiporder',
  templateUrl: './shiporder.component.html',
  styleUrls: ['./shiporder.component.css']
})
export class ShiporderComponent implements OnInit, OnDestroy {

  orderList: Order[];
  showHide: boolean;
  private ngUnsubscribe = new Subject();

  private shipOrder(index) {
    var id = { orderId: this.orderList[index].orderId} ;
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

  getOrder() {
    const fd = new FormData();
    fd.append('value', 'false');
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

  constructor(private orderService: OrderService) {
   }

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
