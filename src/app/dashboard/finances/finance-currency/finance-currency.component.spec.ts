
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceCurrencyComponent } from './finance-currency.component';

describe('FinanceCurrencyComponent', () => {
  let component: FinanceCurrencyComponent;
  let fixture: ComponentFixture<FinanceCurrencyComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceCurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinanceCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
