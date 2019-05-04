import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlowerService } from '../services/flower.service';
import { OrderService } from '../services/order.service';
import { Router } from '@angular/router';
import { Flower } from '../interface/Flower';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private flowerList: Flower[];
  private ngUnsubscribe = new Subject();
  BUTTON: Boolean;
  cusShow: Boolean;
  sellShow: Boolean;

  private Toggle() {
    this.cusShow = !this.cusShow;
    this.sellShow = !this.sellShow;
  }

  private toggleAvailable(index) {
    const fd = new FormData();
    fd.append('flowerName', this.flowerList[index].flowerName);
    fd.append('isAvailable', (!this.flowerList[index].isAvailable).toString());
    this.flowerService.updateAvailable(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res) {
        this.getFlower();
      }
    }, err => {
      if(err) {
        console.log(err);
        this.router.navigate(['/dashboard']);
      }
    });

  }

  private cusSellController() {
    if(localStorage.getItem('userType') == 'Customer') {
      this.cusShow = true;
      this.BUTTON = false;
      this.sellShow = false;
    }
    else {
      this.cusShow = false;
      this.BUTTON = true;
      this.sellShow = true;
    }
  }

  private getFlower() {
    this.flowerService.getFlower().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      if(data) {
        this.flowerList = data;
      }
    }, err => {
      if(err) {
        localStorage.clear();
        this.router.navigate(['/']);
        console.log(err);
      }
    })
  }

  private buyFlower(index) {
    this.orderService.setBuyFlower(this.flowerList[index]);
    this.router.navigate(['/dashboard/buy']);
  }

  private deleteFlower(index) {
    var x = confirm("Do you want to Delete " + this.flowerList[index].flowerName + "?");
    if(x) {
      const fd = new FormData();
      fd.append('flowerName', this.flowerList[index].flowerName);
      fd.append('imgPath', this.flowerList[index].imgPath);
      this.flowerService.deleteFlower(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        if(res) {
          this.getFlower();
        }
      }, err => {
        if(err) {
          console.log(err);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }

  constructor(private flowerService: FlowerService, private router: Router, private orderService: OrderService) {
    this.cusSellController();
  }

  ngOnInit() {
    this.getFlower();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
