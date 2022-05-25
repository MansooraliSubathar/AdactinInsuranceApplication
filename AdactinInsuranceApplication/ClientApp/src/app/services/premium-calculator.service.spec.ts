import { TestBed } from '@angular/core/testing';

import { PremiumCalculatorService } from './premium-calculator.service';

describe('PremiumCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiumCalculatorService = TestBed.get(PremiumCalculatorService);
    expect(service).toBeTruthy();
  });
});
