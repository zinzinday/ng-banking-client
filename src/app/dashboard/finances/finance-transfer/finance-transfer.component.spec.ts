import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTransferComponent } from './finance-transfer.component';

describe('FinanceTransferComponent', () => {
  let component: FinanceTransferComponent;
  let fixture: ComponentFixture<FinanceTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
