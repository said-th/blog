import {Observable, throwError} from 'rxjs';
import {Tag} from '../models/Tag';

export abstract class TagData {
  abstract getTags(): Observable<Tag[]>;

  abstract saveTag(tag: Tag): Observable<any>;

  abstract removeTag(tag: string): Observable<any>;


  errorHandler(error): Observable<never> {
    return throwError('Error : ' + error.message);
  }
}
