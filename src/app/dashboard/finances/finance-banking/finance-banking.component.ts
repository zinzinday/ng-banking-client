import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {Banking} from '../../../models/banking';


@Component({
  selector: 'app-finance-banking',
  templateUrl: './finance-banking.component.html',
  styleUrls: ['./finance-banking.component.scss']
})
export class FinanceBankingComponent implements OnInit {
  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: Banking[] = [
    {id: '1', name: 'Vietcombank', bankName: 'Ngoai thuong Viet Nam', swiftCode: null},
    {id: '1', name: 'Vietinbank', bankName: 'Cong thuong Viet Nam', swiftCode: null},
  ];
  displayedColumns = ['name', 'bankName', 'actions'];

  constructor() {
  }

  ngOnInit() {
  }

}
