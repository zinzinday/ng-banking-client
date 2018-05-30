import {InjectionToken} from '@angular/core';

export const LOCAL_STORAGE_PREFIX = new InjectionToken<string>('localStoragePrefix', {providedIn: 'root', factory: () => ''});
