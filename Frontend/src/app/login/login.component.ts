import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  private authUser(data) {
    this.userService.logIn(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res) {
        this.auth.setUserLoggedIn();
        localStorage.setItem('Token' , res['token']);
        localStorage.setItem('userName', res['userName']);
        localStorage.setItem('userType', res['userType']);
        this.router.navigate(['dashboard']);
      }
    }, error => {
      if(error) {
        console.log(error);
      }
    });
  }

  loginUser(event) {
    event.preventDefault();
    const target = event.target;
    const username = target.querySelector('#userName').value;
    const password = target.querySelector('#passWord').value;

    if(username == '' || password == '') {
      alert("One or more fields are empty");
    }
    else {
      const fd = new FormData();
      fd.append('userName', username);
      fd.append('password', password);
      this.authUser(fd);
    }
  }

  constructor(private userService: UserService, private router: Router, private auth: AuthService) {
    if(localStorage.getItem('Token')) {
      this.userService.checkAuth().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        if(res) {
          this.router.navigate(['/dashboard']);
          this.auth.setUserLoggedIn();
        }
      }, err => {
        if(err) {
          localStorage.clear();
          alert("Please Log In");
        }
      })
    }
    else {
      this.userService.checkConnectivity().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {}, err => {
        alert("No Connectivity to the Server");
      })
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
