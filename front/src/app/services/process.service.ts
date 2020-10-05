import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {MetaData} from '../data/MetaData';

@Injectable()
export class ProcessService {

  constructor(private http: HttpClient) {
  }




}
