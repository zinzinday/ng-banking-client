import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../providers/layout-service/layout.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {

  constructor(public layout: LayoutService) {
  }

  ngOnInit() {
  }

}
