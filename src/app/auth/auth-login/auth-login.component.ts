import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../../providers/layout-service/layout.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  constructor(public layout: LayoutService) { }

  ngOnInit() {
  }

}
