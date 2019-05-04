import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flower } from '../interface/Flower';

@Injectable({
  providedIn: 'root'
})
export class FlowerService {

  private URL: String = 'http://192.168.43.249:8080/';

  getFlower() {
    const fd = this.func1();
    return this.http.post<Flower[]>(this.URL + 'flower/getflower', fd);
  }

  deleteFlower(data) {
    const fd = this.func2(data);
    return this.http.post(this.URL + 'flower/deleteflower', fd);
  }

  updateAvailable(data) {
    const fd = this.func2(data);
    return this.http.post(this.URL + 'flower/updateflower', fd);
  }

  addImage(data) {
    const fd = this.func2(data);
    return this.http.post(this.URL + 'flower/addimage', fd);
  }

  addFlower(data) {
    const fd = this.func2(data);
    console.log(fd);
    return this.http.post(this.URL + 'flower/addflower', fd);
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
