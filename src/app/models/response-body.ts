import {EntryErrors} from './entry-errors';

export interface ResponseBody {
  success: boolean;
  data: any | any[];
  errors: EntryErrors[];
}
