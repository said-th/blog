import {Observable, throwError} from 'rxjs';
import {Meta} from '../models/Meta';


export abstract class MetaData {
  abstract getMetadata(): Observable<Meta>;

  abstract updateMetaData(metadata: Meta): Observable<Response>;

  abstract deleteMetaData(id: string): Observable<Response>;


  errorHandler(error): Observable<never> {
    return throwError('Error : ' + error.message);
  }
}
