import {forwardRef, Inject, Injectable} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RestfulService {

  constructor(@Inject(forwardRef(() => AuthService)) public auth: AuthService) {
  }
}
