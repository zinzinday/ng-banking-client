import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthLoginComponent} from './auth/auth-login/auth-login.component';
import {AuthRegisterComponent} from './auth/auth-register/auth-register.component';
import {AuthResetComponent} from './auth/auth-reset/auth-reset.component';
import {SettingProfileComponent} from './dashboard/settings/setting-profile/setting-profile.component';
import {SettingReferenceComponent} from './dashboard/settings/setting-reference/setting-reference.component';
import {SettingSecurityComponent} from './dashboard/settings/setting-security/setting-security.component';
import {SettingNotificationComponent} from './dashboard/settings/setting-notification/setting-notification.component';
import {FinanceBankingComponent} from './dashboard/finances/finance-banking/finance-banking.component';
import {FinanceCurrencyComponent} from './dashboard/finances/finance-currency/finance-currency.component';
import {FinanceBankAccountComponent} from './dashboard/finances/finance-bank-account/finance-bank-account.component';
import {AuthLayoutComponent} from './auth/auth-layout/auth-layout.component';
import {LayoutComponent} from './dashboard/layout/layout.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {FinanceDepositComponent} from './dashboard/finances/finance-deposit/finance-deposit.component';
import {FinanceWithdrawalComponent} from './dashboard/finances/finance-withdrawal/finance-withdrawal.component';
import {FinanceTransferComponent} from './dashboard/finances/finance-transfer/finance-transfer.component';
import {FinanceLayoutComponent} from './dashboard/finances/finance-layout/finance-layout.component';
import {SettingLayoutComponent} from './dashboard/settings/setting-layout/setting-layout.component';
import {FinanceLoansComponent} from './dashboard/finances/finance-loans/finance-loans.component';
import {SummaryComponent} from './dashboard/summary/summary.component';
import {WelcomeComponent} from './auth/welcome/welcome.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    AuthResetComponent,
    SettingProfileComponent,
    SettingReferenceComponent,
    SettingSecurityComponent,
    SettingNotificationComponent,
    FinanceBankingComponent,
    FinanceCurrencyComponent,
    FinanceBankAccountComponent,
    AuthLayoutComponent,
    LayoutComponent,
    FinanceDepositComponent,
    FinanceWithdrawalComponent,
    FinanceTransferComponent,
    FinanceLayoutComponent,
    SettingLayoutComponent,
    FinanceLoansComponent,
    SummaryComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
