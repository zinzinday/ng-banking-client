import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../../../providers/layout-service/layout.service';

@Component({
  selector: 'app-setting-layout',
  templateUrl: './setting-layout.component.html',
  styleUrls: ['./setting-layout.component.scss']
})
export class SettingLayoutComponent implements OnInit {

  constructor(public layout: LayoutService) { }

  ngOnInit() {
  }

}
