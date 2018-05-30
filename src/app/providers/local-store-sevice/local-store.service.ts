import {Inject, Injectable, InjectionToken, Optional} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

export const LOCAL_STORAGE_PREFIX = new InjectionToken<string>('localStoragePrefix', {providedIn: 'root', factory: () => ''});

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor(@Optional() @Inject(LOCAL_STORAGE_PREFIX) protected prefix: string | null = null) {
  }

  /**
   *
   * @param {string} key
   * @returns {string}
   */
  protected prefixWithKey(key): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Gets an item value in local storage
   * @param {string} key
   * @returns {Observable<T | null>}
   * @throws {throwError}
   */
  getItem<T = any>(key: string): Observable<T | null> {

    const stringify = localStorage.getItem(this.prefixWithKey(key));
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
   * Sets an item into local storage
   * @param {string} key
   * @param {any} data
   * @returns {Observable<boolean>}
   */
  setItem(key: string, data: any): Observable<boolean> {
    localStorage.setItem(this.prefixWithKey(key), JSON.stringify(data));
    return of(true);
  }

  /**
   * Deletes an item in local storage
   * @param {string} key
   * @returns {Observable<boolean>}
   */
  removeItem(key: string): Observable<boolean> {
    localStorage.removeItem(this.prefixWithKey(key));
    return of(true);
  }

  /**
   * Clear all items from local storage
   * @returns {Observable<boolean>}
   */
  clear(): Observable<boolean> {
    localStorage.clear();
    return of(true);
  }
}
