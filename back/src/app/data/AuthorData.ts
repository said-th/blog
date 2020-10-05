import {Observable, throwError} from 'rxjs';
import {Author} from '../models/Author';
import {Response} from '../models/Response';


export abstract class AuthorData {

  abstract author(): Author;

  abstract login(author: Author): Observable<Response>;

  abstract register(author: Author): Observable<Response>;

  abstract update(author: Author): Observable<Response>;

  abstract delete(id: string): Observable<Response>;


  errorHandler(error): Observable<never> {
    return throwError('Error : ' + error.message);
  }
}
