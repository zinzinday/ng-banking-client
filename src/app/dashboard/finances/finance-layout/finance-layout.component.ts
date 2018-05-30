import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../providers/layout-service/layout.service';

@Component({
  selector: 'app-finance-layout',
  templateUrl: './finance-layout.component.html',
  styleUrls: ['./finance-layout.component.scss']
})
export class FinanceLayoutComponent implements OnInit {

  constructor(public layout: LayoutService) {
  }

  ngOnInit() {
  }

}
