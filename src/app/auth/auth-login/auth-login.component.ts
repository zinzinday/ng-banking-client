import {Component, OnInit} from '@angular/core';
import {LayoutService} from '../../providers/layout-service/layout.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestfulService} from '../../providers/restful-service/restful.service';
import {ResponseBody} from '../../models/response-body';
import {Location} from '@angular/common';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  visible: false;
  inProgress = false;

  constructor(public layout: LayoutService,
              private fb: FormBuilder,
              private router: Router,
              private location: Location,
              private rest: RestfulService) {

  }


  ngOnInit() {

  }

  goRegister() {
    this.router.navigate(['register']).catch();
    return false;
  }

  goReset() {
    this.router.navigate(['reset']).catch();
    return false;
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.inProgress = true;
      this.rest.login(this.loginForm.value).subscribe((body: ResponseBody) => {
        if (body.success) {
          this.rest.auth.credential = body.data.credential;
          this.rest.auth.profile = body.data.profile;
          this.layout.alert('You have logged in success!');
          // this.snackBar.open('', 'Dismiss', {duration: 3000});
          this.router.navigate(['finances']).catch();
        } else {
          this.rest.setErrors(this.loginForm, body.errors);
        }
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      });
    }
  }
}
