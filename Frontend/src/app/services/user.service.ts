import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: String = 'http://192.168.43.249:8080/';

  logIn(data) {
    return this.http.post(this.URL + 'user/login', data);
  }

  signUp(data) {
    return this.http.post(this.URL + 'user/signup', data);
  }

  checkAuth() {
    const fd = new FormData();
    fd.append('Token', localStorage.getItem('Token'));
    return this.http.post(this.URL + 'user/checkauth', fd);
  }

  checkConnectivity() {
    console.log(this.URL);
    return this.http.get(this.URL + 'user/checkconnect');
  }
  
  constructor(private http: HttpClient) { }
}
