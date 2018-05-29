import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Credential} from '../../models/credential';
import {Profile} from '../../models/profile';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  get isLoggedIn(): boolean {
    return !!this.credential;
  }

  get credential(): Credential {
    return JSON.parse(localStorage.getItem('credential'));
  }

  get profile(): Profile {
    return JSON.parse(localStorage.getItem('profile'));
  }

  set credential(data: Credential) {
    localStorage.setItem('credential', JSON.stringify(data));
  }

  set profile(data: Profile) {
    localStorage.setItem('profile', JSON.stringify(data));
  }

}
