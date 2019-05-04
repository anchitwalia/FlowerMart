import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiporderComponent } from './shiporder.component';

describe('ShiporderComponent', () => {
  let component: ShiporderComponent;
  let fixture: ComponentFixture<ShiporderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiporderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiporderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
