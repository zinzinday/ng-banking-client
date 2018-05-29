import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBankAccountComponent } from './finance-bank-account.component';

describe('FinanceBankAccountComponent', () => {
  let component: FinanceBankAccountComponent;
  let fixture: ComponentFixture<FinanceBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
