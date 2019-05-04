import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInStatus = false || JSON.parse(localStorage.getItem('loggedIn'));

  constructor() {
    this.loggedInStatus = false;
  }

  setUserLoggedIn() {
    this.loggedInStatus = true;
    localStorage.setItem('loggedIn', 'true');
  }

  setUserLoggedOut() {
    this.loggedInStatus = false;
    localStorage.clear();
  }

  getUserLoggedIn() {
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString());
  }
}
