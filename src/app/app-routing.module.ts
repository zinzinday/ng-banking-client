import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingLayoutComponent} from './dashboard/settings/setting-layout/setting-layout.component';
import {FinanceLayoutComponent} from './dashboard/finances/finance-layout/finance-layout.component';
import {AuthResetComponent} from './auth/auth-reset/auth-reset.component';
import {AuthGuard} from './providers/auth-guard/auth.guard';

const routes: Routes = [
  {path: 'settings', component: SettingLayoutComponent, canActivate: [AuthGuard]},
  {path: 'finances', component: FinanceLayoutComponent, canActivate: [AuthGuard]},
  {path: 'password', component: AuthResetComponent, canDeactivate: [AuthGuard]},
  {path: 'register', component: AuthResetComponent, canDeactivate: [AuthGuard]},
  {path: 'login', component: AuthResetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
