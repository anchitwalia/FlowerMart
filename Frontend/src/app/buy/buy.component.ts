import { Component, OnInit, OnDestroy } from '@angular/core';
import { Flower } from '../interface/Flower';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.css']
})
export class BuyComponent implements OnInit, OnDestroy {

  flower: Flower;
  private today;
  private ngUnsubscribe = new Subject();

  buyFlower(event) {
    event.preventDefault();
    const target = event.target;
    const fd = this.orderHelper(target);
    this.orderService.addOrder(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res) {
        alert('Order placed Successfuly');
        this.router.navigate(['/dashboard']);
      }
    }, err => {
      if(err) {
        alert('Order Failed');
      }
    })
  }

  private orderHelper(target) {
    const fd = new FormData();
    fd.append('flowerName', this.flower.flowerName.toLowerCase());
    fd.append('flowerPrice', this.flower.flowerPrice.toLowerCase());
    fd.append('userName', localStorage.getItem('userName').toLowerCase());
    fd.append('name', target.querySelector('#buyname').value.toLowerCase());
    fd.append('mobile', target.querySelector('#buymob').value.toLowerCase());
    fd.append('address', target.querySelector('#buyadd1').value.toLowerCase() +", "+ target.querySelector('#buyadd2').value.toLowerCase());
    fd.append('city', target.querySelector('#buycity').value.toLowerCase());
    fd.append('zip', target.querySelector('#buyzip').value.toLowerCase());
    fd.append('country', target.querySelector('#buycon').value.toLowerCase());
    fd.append('isShipped', 'false');
    fd.append('date', this.today.getDate() + '-' + (this.today.getMonth()+1) + '-' + this.today.getFullYear());
    fd.append('time', this.today.getHours() + ":" + this.today.getMinutes() + ":" + this.today.getSeconds());
    return fd;
  }

  constructor(private orderService: OrderService, private router: Router) { 
    this.today = new Date();
  }

  ngOnInit() {
    this.flower = this.orderService.getBuyFlower();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
