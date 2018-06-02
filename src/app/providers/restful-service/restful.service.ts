import {Injectable} from '@angular/core';
import {AuthService} from '../auth-service/auth.service';
import {AbstractControl, FormGroup} from '@angular/forms';
import {EntryErrors} from '../../models/entry-errors';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseBody} from '../../models/response-body';
import {map, mergeMap} from 'rxjs/internal/operators';
import {Credential} from '../../models/credential';


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

  /**
   *
   * @param {Credential} credential
   * @param options
   * @returns {any}
   */
  private optionsWithCredential(credential: Credential, options?: any): any {
    if (!options) {
      options = {headers: {}};
    } else if (options && !options.hasOwnProperty('headers')) {
      options.headers = {};
    }
    Object.assign(options.headers, {Authorization: credential.type + ' ' + credential.accessToken});
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
      return this.auth.credential.pipe(mergeMap((credential: Credential) => {
        return this.http.get(this.url(path), this.optionsWithCredential(credential, options)).pipe(
          map((body: any) => body)
        );
      }));
    } else {
      return this.http.get(this.url(path), options).pipe(map((body: any) => {
        return body;
      }));
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

      return this.auth.credential.pipe(mergeMap((credential: Credential) => {
        return this.http.post(this.url(path), value, this.optionsWithCredential(credential, options))
          .pipe(map((body: any) => body));
      }));

    } else {

      return this.http.post(this.url(path), value, options).pipe(map((body: any) => {
        return body;
      }));

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
    return this.auth.credential.pipe(mergeMap((credential: Credential) => {
      return this.http.put(this.url(path), value, this.optionsWithCredential(credential, options))
        .pipe(map((body: any) => body));
    }));
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

  login(value: any): Observable<ResponseBody> {
    return this.post('user/authorize', value);
  }

  register(value: any): Observable<ResponseBody> {
    return this.post('user', value);
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

  get bankingList(): Observable<ResponseBody> {
    return this.get('banking');
  }

  get currencyList() {
    return this.get('currency');
  }

  get bankAccounts(): Observable<ResponseBody> {
    return this.get('accounts', true);
  }

}
