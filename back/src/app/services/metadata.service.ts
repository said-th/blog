import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {MetaData} from '../data/MetaData';
import {Meta} from '../models/Meta';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetadataService extends MetaData {

  constructor(private http: HttpClient) {
    super();
  }

  deleteMetaData(id: string): Observable<Response> {
    return undefined;
  }

  getMetadata(): Observable<Meta> {
    return undefined;
  }

  updateMetaData(metadata: Meta): Observable<Response> {
    return undefined;
  }


}
