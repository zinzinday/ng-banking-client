import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingLayoutComponent} from './dashboard/settings/setting-layout/setting-layout.component';
import {FinanceLayoutComponent} from './dashboard/finances/finance-layout/finance-layout.component';
import {AuthResetComponent} from './auth/auth-reset/auth-reset.component';
import {AuthGuard} from './providers/auth-guard/auth.guard';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {GuestGuard} from './providers/guest-guard/guest.guard';

const routes: Routes = [
  {path: 'settings', component: SettingLayoutComponent, canActivate: [AuthGuard]},
  {path: 'finances', component: FinanceLayoutComponent, canActivate: [AuthGuard]},
  {path: 'reset', component: AuthResetComponent, canActivate: [GuestGuard]},
  {path: 'register', component: AuthRegisterComponent, canActivate: [GuestGuard]},
  {path: '', component: AuthLoginComponent, canActivate: [GuestGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
