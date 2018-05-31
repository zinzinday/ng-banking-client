import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Credential} from '../../models/credential';
import {Profile} from '../../models/profile';
import {HttpClient} from '@angular/common/http';
import {LocalStorageService} from '../storage-service/local-storage.service';
import {map} from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private storage: LocalStorageService) {

  }

  get isLoggedIn(): Observable<boolean> {
    return this.credential.pipe(map((data) => {
      return !!data;
    }));
  }

  get isRoleSupper(): Observable<boolean> {
    return this.profile.pipe(map((data: Profile) => {
      if (data) {
        return data.hasSupper;
      }
      return false;
    }));
  }

  deauthorize() {
    this.storage.removeItem('credential');
    this.storage.removeItem('profile');
  }

  get credential(): Observable<Credential> {
    return this.storage.getItem('credential');
  }

  get profile(): Observable<Profile> {
    return this.storage.getItem('profile');
  }

  set credential(data: Observable<Credential>) {
    this.storage.setItem('credential', data);
  }

  set profile(data: Observable<Profile>) {
    this.storage.setItem('profile', data);
  }

}
