import { TestBed, async, inject } from '@angular/core/testing';

import { AuthSellerGuard } from './auth-seller.guard';

describe('AuthSellerGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthSellerGuard]
    });
  });

  it('should ...', inject([AuthSellerGuard], (guard: AuthSellerGuard) => {
    expect(guard).toBeTruthy();
  }));
});
