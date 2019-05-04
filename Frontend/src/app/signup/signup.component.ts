import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();

  public signUp(event) {

    event.preventDefault();
    const target = event.target;

    if(this.validate(target)) {
      console.log("Error");
    }
    else {
      const fd = new FormData();

      fd.append('fullName', ((document.getElementById("addfullName") as HTMLInputElement).value));
      fd.append('userName', ((document.getElementById("adduserName") as HTMLInputElement).value));
      fd.append('userType', ((document.getElementById("userType") as HTMLInputElement).value));
      fd.append('password', ((document.getElementById("addpassWord1") as HTMLInputElement).value));

      this.userService.signUp(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        if(res) {
          alert("Data Saved");
          target.reset();
          this.router.navigate(['/']);
        }
      }, err => {
        console.log(err);
      })
    }
  }
  
  private validate(target) {
    if(target.querySelector('#addfullName').value == "") {
      alert("Please Enter Full Name");
      return true;
    }
    else if(target.querySelector('#adduserName').value == "") {
      alert("Please Enter User Name");
      return true;
    }
    else if(document.getElementById('userType').nodeValue == "") {
      alert("Please Specify User Type");
      return true;
    }
    else if(target.querySelector('#addpassWord1').value == "") {
      alert("Please Enter Password");
      return true;
    }
    else if(target.querySelector('#addpassWord2').value == "") {
      alert("Please Enter Confirm Password");
      return true;
    }
    else if(target.querySelector('#addpassWord1').value != target.querySelector('#addpassWord2').value) {
      target.reset();
      alert("Password Does not match");
      return true;
    }
    return false;
  }

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
