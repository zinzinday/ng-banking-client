import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceBankingComponent } from './finance-banking.component';

describe('FinanceBankingComponent', () => {
  let component: FinanceBankingComponent;
  let fixture: ComponentFixture<FinanceBankingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceBankingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceBankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
