import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../../providers/layout-service/layout.service';
import {RestfulService} from '../../../providers/restful-service/restful.service';

@Component({
  selector: 'app-finance-layout',
  templateUrl: './finance-layout.component.html',
  styleUrls: ['./finance-layout.component.scss']
})
export class FinanceLayoutComponent implements OnInit {

  constructor(public layout: LayoutService, public rest: RestfulService) {
  }

  ngOnInit() {
    this.rest.me.subscribe(profile => {
      console.log(profile);
    });
  }

}
