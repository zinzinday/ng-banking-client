import {Injectable} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {AbstractControl, FormGroup} from '@angular/forms';
import {EntryErrors} from '../../models/entry-errors';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseBody} from '../../models/response-body';
import {map, mergeMap} from 'rxjs/internal/operators';
import {Credential} from '../../models/credential';
import {Banking} from '../../models/banking';
import {Profile} from '../../models/profile';


@Injectable({
  providedIn: 'root',
})
export class RestfulService {
  private endpoint = 'http://localhost:3000/';

  constructor(private http: HttpClient,
              public auth: AuthService) {
  }

  url(path: string): string {
    return this.endpoint + path;
  }


  private optionsWithCredential(credential: Credential, options: any = {headers: {}}): any {
    console.log('options', options);
    if (!options) {
      options = {headers: {}};
    } else if (options && !options.hasOwnProperty('headers')) {
      options.headers = {};
    }
    Object.assign(options.headers, {Authorization: credential.type + ' ' + credential.access_token});
    return options;
  }

  /**
   *
   * @param {string} path
   * @param {boolean} authorized
   * @param options
   * @returns {Observable<ResponseBody>}
   */
  private get(path: string, authorized?: boolean, options?: any): Observable<ResponseBody> {
    if (authorized) {
      return this.pipeBody(this.auth.credential.pipe(mergeMap((credential: Credential) => {
        return this.http.get(this.url(path), this.optionsWithCredential(credential, options));
      })));
    } else {
      return this.pipeBody(this.http.get(this.url(path), options));
    }
  }

  /**
   *
   * @param {string} path
   * @param value
   * @param {boolean} authorized
   * @param options
   * @returns {Observable<ResponseBody>}
   */
  private post(path: string, value?: any, authorized?: boolean, options?: any): Observable<ResponseBody> {
    if (authorized) {
      return this.pipeBody(this.auth.credential.pipe(mergeMap((credential: Credential) => {
        return this.http.post(this.url(path), value, this.optionsWithCredential(credential, options));
      })));
    } else {
      return this.pipeBody(this.http.post(this.url(path), value, options));
    }

  }

  /**
   *
   * @param {string} path
   * @param value
   * @param options
   * @returns {Observable<ResponseBody>}
   */
  private put(path: string, value?: any, options?: any): Observable<ResponseBody> {
    return this.pipeBody(this.auth.credential.pipe(mergeMap((credential: Credential) => {
      return this.http.put(this.url(path), value, this.optionsWithCredential(credential, options));
    })));
  }

  /**
   *
   * @param {FormGroup} form
   * @param {EntryErrors[]} errors
   */
  setErrors(form: FormGroup, errors: EntryErrors[]): void {
    // TODO Enhancement for multiple levels
    if (errors && errors.length) {
      for (let err of errors) {
        let control: AbstractControl;
        if (err.group) {
          control = form.get(err.group).get(err.field);
        } else {
          control = form.get(err.field);
        }
        if (control) {
          control.setErrors({restful: err.message});
        }
      }
    }
  }

  pipeBody(observable: Observable<Object>): Observable<ResponseBody> {
    return observable.pipe(map((body: any) => body));
  }

  mapData(observable: Observable<Object>): Observable<any> {
    return observable.pipe(map((body: ResponseBody) => {
      if (body.success) {
        return body.data;
      }
      return [];
    }));
  }

  login(value: any): Observable<ResponseBody> {
    return this.post('user/authorize', value);
  }

  register(value: any): Observable<ResponseBody> {
    return this.post('user', value);
  }

  get me(): Observable<Profile> {
    return this.mapData(this.get('user/me', true, {headers: {'x-powered-by': 'Nghia Nguyen'}}));
  }

  requestPassword(value: any): Observable<ResponseBody> {
    return this.post('user/password/request', value);
  }

  resetPassword(value: any) {
    return this.post('user/password/reset', value);
  }

  userUpdate(value: any): Observable<ResponseBody> {
    return this.put('user', value);
  }

  get bankingList(): Observable<Banking[]> {
    return this.mapData(this.get('banking'));
  }

  get currencyList() {
    return this.get('currency');
  }

  get bankAccounts(): Observable<ResponseBody> {
    return this.get('accounts', true);
  }

}
