import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestfulService} from '../../providers/restful-service/restful.service';
import {ResponseBody} from '../../models/response-body';
import {LayoutService} from '../../providers/layout-service/layout.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-register',
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.scss']
})
export class AuthRegisterComponent implements OnInit {
  registerForm: FormGroup = this.fb.group({
    fullname: ['', Validators.required],
    phones: this.fb.group({phoneNumber: ['', Validators.required]}),
    emails: this.fb.group({email: ['', Validators.required]}),
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  visible: false;
  inProgress = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              public rest: RestfulService,
              public layout: LayoutService) {
  }

  ngOnInit() {

  }

  onRegister() {
    if (this.registerForm.valid) {
      this.inProgress = true;
      this.rest.register(this.registerForm.value).subscribe((body: ResponseBody) => {
        if (body.success) {
          this.layout.alert('Your account have created success!');
          this.router.navigate(['']).catch();
        } else {
          if (body.errors) {
            this.rest.setErrors(this.registerForm, body.errors);
          }
        }
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      });
    } else {
      console.log(this.registerForm.errors);
    }
  }

  get phoneControl(): AbstractControl {
    return this.registerForm.get('phones').get('phoneNumber');
  }

  get emailControl(): AbstractControl {
    return this.registerForm.get('emails').get('email');
  }

  goLogin() {
    this.router.navigate(['']).catch();
  }
}
