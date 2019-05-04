import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: String;
  private userType: String;
  cusObject: Boolean;
  sellObject: Boolean;

  logOut() {
    const result = confirm("You are being Logged out. Do you want to Log out?");
    if(result) {
      this.router.navigate(['/']);
      this.auth.setUserLoggedOut();
    }
  }

  private cusSellController() {
    if(this.userType == 'Customer') {
      this.cusObject = true;
      this.sellObject = false;
    } else {
      this.cusObject = false;
      this.sellObject = true;
    }
  }

  constructor(private router: Router, private auth: AuthService) {
    if(localStorage.getItem('userName')) {
      this.userName = localStorage.getItem('userName').toUpperCase();
      this.userType = localStorage.getItem('userType');
      this.cusSellController();
    }
    else {
      alert("Please Log In");
      router.navigate(['/']);
    }
   }

  ngOnInit() {
  }

}
