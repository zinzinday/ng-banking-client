import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RestfulService} from '../../providers/restful-service/restful.service';
import {LayoutService} from '../../providers/layout-service/layout.service';
import {ResponseBody} from '../../models/response-body';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './auth-reset.component.html',
  styleUrls: ['./auth-reset.component.scss']
})
export class AuthResetComponent implements OnInit {

  lookForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
  });

  requestForm: FormGroup = this.fb.group({
    secret: ['xxxxxxxxxxxx', Validators.required],
    case: ['', Validators.required]
  });

  confirmForm: FormGroup = this.fb.group({
    secret: ['xxxxxxxxxxxxxxxx', Validators.required],
    code: ['', Validators.required]
  });

  resetForm: FormGroup = this.fb.group({
    password: ['', Validators.required],
  });

  inProgress = true;
  step = 0;

  contacts = [
    {id: 1, name: 'aaaa...am@gmail.com'},
    {id: 2, name: 'bbbb...b@gmail.com'},
    {id: 3, name: 'cccc...c@gmail.com'}
  ];

  constructor(private fb: FormBuilder,
              private router: Router,
              public rest: RestfulService,
              public layout: LayoutService) {
  }

  ngOnInit() {
  }

  onLook(value: any) {
    this.rest.requestPassword(value).subscribe((body: ResponseBody) => {
      if (body.success) {
        this.resetForm.setValue(body.data);
        this.step = 1;
      } else {
        this.rest.setErrors(this.requestForm, body.errors);
      }
      this.inProgress = false;
    }, () => {
      this.inProgress = false;
    });
  }

  onGenerate() {
    if (this.resetForm.valid) {
      this.rest.resetPassword(this.resetForm.value).subscribe((body: ResponseBody) => {
        if (body.success) {
          this.router.navigate(['']).catch();
          this.layout.alert('Your new password has been changed!');
        } else {
          this.rest.setErrors(this.requestForm, body.errors);
        }
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      });
    }
  }
}
