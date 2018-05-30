import {Inject, Injectable, Optional} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {LOCAL_STORAGE_PREFIX} from './tokens';
import {StorageServiceInterface} from './storage-service.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements StorageServiceInterface {

  constructor(@Optional() @Inject(LOCAL_STORAGE_PREFIX) protected prefix: string | null = null) {
  }

  /**
   *
   * @param {string} key
   * @returns {string}
   */
  protected keyWithPrefix(key): string {
    return `${this.prefix}${key}`;
  }

  /**
   * @inheritDoc
   */
  getItem<T = any>(key: string): Observable<T | null> {

    const stringify = localStorage.getItem(this.keyWithPrefix(key));
    let data: T | null = null;
    if (stringify != null) {
      try {
        data = JSON.parse(stringify);
      } catch (error) {
        return throwError(new Error(`Invalid data.`));
      }
    }
    return of(data);
  }

  /**
   * @inheritDoc
   */
  setItem(key: string, data: any): Observable<boolean> {
    localStorage.setItem(this.keyWithPrefix(key), JSON.stringify(data));
    return of(true);
  }

  /**
   * @inheritDoc
   */
  removeItem(key: string): Observable<boolean> {
    localStorage.removeItem(this.keyWithPrefix(key));
    return of(true);
  }

  /**
   * @inheritDoc
   */
  clear(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }
}
