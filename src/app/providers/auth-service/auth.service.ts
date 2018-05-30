import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Credential} from '../../models/credential';
import {Profile} from '../../models/profile';
import {map} from 'rxjs/internal/operators';
import {HttpClient} from '@angular/common/http';
import {LocalStoreService} from '../local-store-sevice/local-store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private localStore: LocalStoreService) {

  }

  get isLoggedIn(): boolean {
    return !!this.credential;
  }

  get credential(): Observable<Credential> {
    return this.localStore.getItem('credential');
  }

  get profile(): Observable<Profile> {
    return this.localStore.getItem('profile');
  }

  set credential(data: Observable<Credential>) {
    this.localStore.setItem('credential', data);
  }

  set profile(data: Observable<Profile>) {
    this.localStore.setItem('profile', data);
  }

}
