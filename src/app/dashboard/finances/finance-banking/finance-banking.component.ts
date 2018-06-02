import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {RestfulService} from '../../../providers/restful-service/restful.service';
import {Observable} from 'rxjs';
import {Banking} from '../../../models/banking';


@Component({
  selector: 'app-finance-banking',
  templateUrl: './finance-banking.component.html',
  styleUrls: ['./finance-banking.component.scss']
})
export class FinanceBankingComponent implements OnInit {
  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: Observable<Banking[]> = this.rest.bankingList;
  displayedColumns = ['name', 'bankName', 'actions'];

  constructor(private rest: RestfulService) {
  }

  ngOnInit() {
  }

}
