import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusorderComponent } from './cusorder.component';

describe('CusorderComponent', () => {
  let component: CusorderComponent;
  let fixture: ComponentFixture<CusorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
