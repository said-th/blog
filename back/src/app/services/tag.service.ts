import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {TagData} from '../data/TagData';
import {Tag} from '../models/Tag';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Response} from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class TagService extends TagData {

  constructor(private http: HttpClient) {
    super();
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(environment.api + 'blog/tag/all').pipe(catchError(this.errorHandler));
  }

  removeTag(tagId: string): Observable<any> {
    return this.http.get<Response>(environment.api + 'manage/tag/delete/' + tagId).pipe(catchError(this.errorHandler));
  }

  errorHandler(error): Observable<never> {
    return throwError('Error : ' + error.message);
  }

  saveTag(tag: Tag): Observable<any> {
    return this.http.post(environment.api + 'manage/tag/save', tag).pipe(catchError(this.errorHandler));
  }


}
