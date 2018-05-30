import {Inject, Injectable, Optional} from '@angular/core';
import {first, map, mergeMap} from 'rxjs/operators';
import {fromEvent, Observable, of, race, ReplaySubject, throwError} from 'rxjs';

import {StorageServiceInterface} from './storage-service.interface';
import {LOCAL_STORAGE_PREFIX} from './tokens';

@Injectable({
  providedIn: 'root'
})
export class IndexDBService implements StorageServiceInterface {

  /**
   * IndexedDB database name for local storage
   */
  protected dbName = 'ngStorage';
  /**
   * IndexedDB object store name for local storage
   */
  protected readonly objectStoreName = 'localStorage';
  /**
   * IndexedDB key path name for local storage (where an item's key will be stored)
   */
  protected readonly keyPath = 'key';
  /**
   * IndexedDB data path name for local storage (where items' value will be stored)
   */
  protected readonly dataPath = 'value';
  /**
   * IndexedDB database connection, wrapped in a RxJS ReplaySubject to be able to access the connection
   * even after the connection success event happened
   */
  protected database: ReplaySubject<IDBDatabase>;


  /**
   * Connects to IndexedDB
   */
  constructor(@Optional() @Inject(LOCAL_STORAGE_PREFIX) protected prefix: string | null = null) {
    this.connect();
  }

  /**
   * Connects to IndexedDB and creates the object store on first time
   */
  protected connect() {

    const request = indexedDB.open(this.dbNameWithPrefix());
    (fromEvent(request, 'upgradeneeded') as Observable<Event>)
      .pipe(first())
      .subscribe((event) => {

        const database = (event.target as IDBRequest).result as IDBDatabase;

        if (!database.objectStoreNames.contains(this.objectStoreName)) {
          database.createObjectStore(this.objectStoreName);
        }
      });

    const success = fromEvent(request, 'success') as Observable<Event>;
    (race(success, this.toErrorObservable(request, `connection`)) as Observable<Event>)
      .pipe(first())
      .subscribe((event) => {
        this.database.next((event.target as IDBRequest).result as IDBDatabase);
      }, (error) => {
        this.database.error(error as Error);
      });
  }

  /**
   * Opens an IndexedDB transaction and gets the local storage object store
   * @param {"readonly" | "readwrite"} mode
   * @returns {Observable<any>}
   */
  protected transaction(mode: 'readonly' | 'readwrite' = 'readonly') {

    /* From the IndexedDB connection, opening a transaction and getting the local storage objet store */
    return this.database
      .pipe(map((database) => database.transaction([this.objectStoreName], mode).objectStore(this.objectStoreName)));

  }

  /**
   * Transforms a IndexedDB success event in an RxJS Observable
   * @param {IDBRequest} request
   * @returns {Observable<boolean>}
   */
  protected toSuccessObservable(request: IDBRequest) {

    /* Transforming a IndexedDB success event in an RxJS Observable with true value */
    return (fromEvent(request, 'success') as Observable<Event>)
      .pipe(map(() => true));

  }

  /**
   * Transforms a IndexedDB error event in an RxJS ErrorObservable
   * @param {IDBRequest} request
   * @param {string} error
   * @returns {Observable<any>}
   */
  protected toErrorObservable(request: IDBRequest, error = ``): Observable<any> {

    /* Transforming a IndexedDB error event in an RxJS ErrorObservable */
    return (fromEvent(request, 'error') as Observable<Event>)
      .pipe(mergeMap((event) => throwError(new Error(`IndexedDB ${error} issue : ${request.error.message}.`))));
  }

  /**
   * Normalize database name with prefix
   * @returns {string}
   */
  protected dbNameWithPrefix(): string {
    return `${this.prefix}${this.dbName}`;
  }

  /**
   * @inheritDoc
   */
  getItem<T>(key: string): Observable<T | null> {
    return this.transaction().pipe(
      map((transaction) => transaction.get(key)),
      mergeMap((request) => {
        const success = (fromEvent(request, 'success') as Observable<Event>).pipe(
          map((event) => (event.target as IDBRequest).result),
          map((result) => result && (this.dataPath in result) ? (result[this.dataPath] as T) : null)
        );
        return (race(success, this.toErrorObservable(request, `getter`)) as Observable<T | null>).pipe(first());
      }),
      first()
    );
  }

  /**
   * @inheritDoc
   */
  setItem(key: string, data: any): Observable<boolean> {
    if (data == null) {
      return of(true);
    }
    return this.getItem(key).pipe(
      map((existingData) => (existingData == null) ? 'add' : 'put'),
      mergeMap((method) => {
        /* Opening a transaction */
        return this.transaction('readwrite').pipe(mergeMap((transaction) => {
          let request: IDBRequest;
          switch (method) {
            case 'add':
              request = transaction.add({[this.dataPath]: data}, key);
              break;
            case 'put':
            default:
              request = transaction.put({[this.dataPath]: data}, key);
              break;
          }
          return (race(this.toSuccessObservable(request), this.toErrorObservable(request, `setter`)) as Observable<boolean>).pipe(first());
        }));
      }),
      first()
    );
  }

  /**
   * @inheritDoc
   */
  removeItem(key: string): Observable<boolean> {
    return this.getItem(key).pipe(
      mergeMap((data) => {
        if (data != null) {
          return this.transaction('readwrite').pipe(mergeMap((transaction) => {
            const request = transaction.delete(key);
            return (race(this.toSuccessObservable(request), this.toErrorObservable(request, `remover`)) as Observable<boolean>)
              .pipe(first());
          }));
        }
        return of(true);
      }),
      first()
    );
  }

  /**
   * @inheritDoc
   */
  clear(): Observable<boolean> {
    return this.transaction('readwrite').pipe(
      mergeMap((transaction) => {
        const request = transaction.clear();
        return (race(this.toSuccessObservable(request), this.toErrorObservable(request, `clearer`)) as Observable<boolean>)
          .pipe(first());

      }),
      first()
    );
  }
}
