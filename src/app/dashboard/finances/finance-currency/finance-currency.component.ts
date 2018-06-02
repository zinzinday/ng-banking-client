import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { FinanceCurrencyDataSource } from './finance-currency-datasource';

@Component({
  selector: 'app-finance-currency',
  templateUrl: './finance-currency.component.html',
  styleUrls: ['./finance-currency.component.scss']
})
export class FinanceCurrencyComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: FinanceCurrencyDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new FinanceCurrencyDataSource(this.paginator, this.sort);
  }
}
