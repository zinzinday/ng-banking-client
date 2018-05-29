import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceWithdrawalComponent } from './finance-withdrawal.component';

describe('FinanceWithdrawalComponent', () => {
  let component: FinanceWithdrawalComponent;
  let fixture: ComponentFixture<FinanceWithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceWithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceWithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
