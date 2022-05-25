import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyPremiumComponent } from './monthly-premium.component';

describe('MonthlyPremiumComponent', () => {
  let component: MonthlyPremiumComponent;
  let fixture: ComponentFixture<MonthlyPremiumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyPremiumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
