import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from '../interface/Order';
import { Flower } from '../interface/Flower';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL: String = 'http://192.168.43.249:8080/';

  private flower: Flower;
  
  updateOrder(fd) {
    fd = this.func2(fd);
    return this.http.post(this.URL + 'order/updateorder', fd);
  }

  getOrder() {
    const fd = this.func1();
    return this.http.post<Order[]>(this.URL + 'order/getorder', fd);
  }

  addOrder(fd) {
    fd = this.func2(fd);
    return this.http.post(this.URL + 'order/addorder', fd)
  }

  getOrderByValue(fd) {
    fd = this.func2(fd);
    return this.http.post<Order[]>(this.URL + 'order/getorderbyvalue', fd);
  }

  setBuyFlower(flower) {
    this.flower = flower
  }

  getBuyFlower() {
    return this.flower;
  }

  private func1() {
    const fd = new FormData();
    fd.append('Token', localStorage.getItem('Token'));
    return fd;
  }

  private func2(data) {
    data.append('Token', localStorage.getItem('Token'));
    return data;
  }

  constructor(private http: HttpClient) { }
}
