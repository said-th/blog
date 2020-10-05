import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Tag, TagData} from '../data/TagData';

@Injectable()
export class TagService extends TagData {

  constructor(private http: HttpClient) {
    super();
  }


  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.api + 'tags').pipe(catchError(this.errorHandler));
  }

  errorHandler(error): Observable<never> {
    return throwError('Error while processing data \n' + error.message);
  }

}
