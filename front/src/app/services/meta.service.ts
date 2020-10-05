import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Meta, MetaData} from '../data/MetaData';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';

@Injectable()
export class MetaService extends MetaData {

  constructor(private http: HttpClient) {
    super();
  }

  getSimpleMetaData(): Observable<Meta> {
    return this.http.get<Meta>(environment.api + '/metadata/simple').pipe(catchError(this.errorHandler));
  }
  getDetailedMetaData(): Observable<Meta> {
    return this.http.get<Meta>(environment.api + '/metadata/detailed').pipe(catchError(this.errorHandler));
  }

  errorHandler(error): Observable<never> {
    return throwError('Error while processing data \n' + error.message);
  }
}
