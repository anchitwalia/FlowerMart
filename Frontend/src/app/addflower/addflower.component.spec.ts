import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddflowerComponent } from './addflower.component';

describe('AddflowerComponent', () => {
  let component: AddflowerComponent;
  let fixture: ComponentFixture<AddflowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddflowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddflowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
