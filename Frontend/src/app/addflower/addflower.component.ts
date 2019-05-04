import { Component, OnInit, OnDestroy } from '@angular/core';
import { FlowerService } from '../services/flower.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-addflower',
  templateUrl: './addflower.component.html',
  styleUrls: ['./addflower.component.css']
})

export class AddflowerComponent implements OnInit, OnDestroy {

  private selectedFile: File;
  private ngUnsubscribe = new Subject();

  addFlower() {
    const fd = this.addflowerHelper();
    const fd1 = this.addflowerImage();
    this.flowerSerivce.addFlower(fd).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if(res) {
        this.flowerSerivce.addImage(fd1).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if(res) {
            alert('Flower Saved successfuly');
            this.router.navigate(['/dashboard']);
          }
        }, err1 => {
          if(err1) {
            alert(err1.error.message);
          }
        })
      }
    }, err => {
      if(err) {
        console.log(err);
        alert(err.error.message);
      }
    });
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
  }

  private addflowerImage() {
    const fd = new FormData();
    fd.append('image', 
              this.selectedFile, 
              ((document.getElementById("flowerName") as HTMLInputElement).value));
    return fd;
  }

  private addflowerHelper() {
    const fd = new FormData();

    fd.append('flowerName', ((document.getElementById("flowerName") as HTMLInputElement).value));
    fd.append('flowerPrice', ((document.getElementById("flowerPrice") as HTMLInputElement).value));
    fd.append('isAvailable', 'false');
    fd.append('imgPath', 'assets/images/flower/' + ((document.getElementById("flowerName") as HTMLInputElement).value) + '.jpg');
    
    return fd;
  }

  constructor(private flowerSerivce: FlowerService, private router: Router) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
