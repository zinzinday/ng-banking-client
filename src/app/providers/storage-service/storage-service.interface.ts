import {Observable} from 'rxjs';

export interface StorageServiceInterface {

  /**
   * Gets an item value in storage
   * @param {string} key
   * @returns {Observable<T | null>}
   * @throws {throwError}
   */
  getItem<T = any>(key: string): Observable<T | null>;

  /**
   * Sets an item into storage
   * @param {string} key
   * @param {any} data
   * @returns {Observable<boolean>}
   */
  setItem(key: string, data: any): Observable<boolean>;

  /**
   * Deletes an item in storage
   * @param {string} key
   * @returns {Observable<boolean>}
   */
  removeItem(key: string): Observable<boolean>;


  /**
   * Clear all items from storage
   * @returns {Observable<boolean>}
   */
  clear(): Observable<boolean>;
}
