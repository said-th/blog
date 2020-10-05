import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AuthorData} from '../data/AuthorData';
import {Author} from '../models/Author';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Response} from '../models/Response';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorService extends AuthorData {

  constructor(private http: HttpClient, private token: TokenStorageService) {
    super();
  }

  register(author: Author): Observable<Response> {
    return this.http.post(environment.api + 'blog/register', author).pipe(catchError(this.errorHandler));
  }

  login(author: Author): Observable<Response> {
    return this.http.post(environment.api + 'blog/login', author).pipe(catchError(this.errorHandler));
  }

  author(): Author {
    return this.token.getUser();
  }

  delete(id: string): Observable<Response> {
    return undefined;
  }

  update(author: Author): Observable<Response> {
    return undefined;
  }

  errorHandler(error): Observable<never> {
    return throwError(error);
  }

}
