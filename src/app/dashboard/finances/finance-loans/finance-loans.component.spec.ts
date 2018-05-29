import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceLoansComponent } from './finance-loans.component';

describe('FinanceLoansComponent', () => {
  let component: FinanceLoansComponent;
  let fixture: ComponentFixture<FinanceLoansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceLoansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceLoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
