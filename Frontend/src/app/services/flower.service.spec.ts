import { TestBed } from '@angular/core/testing';

import { FlowerService } from './flower.service';

describe('FlowerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowerService = TestBed.get(FlowerService);
    expect(service).toBeTruthy();
  });
});
