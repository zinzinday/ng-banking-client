import {Component} from '@angular/core';
import {LayoutService} from '../../providers/layout-service/layout.service';
import {AuthService} from '../../providers/auth-service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {


  constructor(public layout: LayoutService, private auth: AuthService, private router: Router) {
  }

  onLogout() {
    this.auth.deauthorize();
    this.router.navigate(['']).catch();
  }
}
