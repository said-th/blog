import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {PostData, Post} from '../data/PostData';
import {environment} from '../../environments/environment.prod';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class PostService extends PostData {

  public popularPosts$: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {
    super();
    this.popularPosts$ = new BehaviorSubject<Post[]>([]);
  }

  getPosts(tag: string = '', pageNumber: any = '0', pageSize: any = '8', query: string = ''): Observable<any> {
    const url = tag ? environment.api + 'posts/' + tag : environment.api + 'posts';

    return this.http.get<any>(url, {
        params: {
          q: encodeURIComponent(query),
          page: pageNumber,
          size: pageSize
        }
      }
    ).pipe(catchError(this.errorHandler));
  }

  getPopularPosts(pageSize: string): Observable<any> {
    const url = environment.api + 'popular';
    return this.http.get<any>(url, {
        params: {
          page: '1',
          size: pageSize
        }
      }
    ).pipe(catchError(this.errorHandler), map(response => response.content));
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(environment.api + 'post/' + slug).pipe(catchError(this.errorHandler));
  }

  errorHandler(error): Observable<never> {
    return throwError('Error while processing data \n' + error.message);
  }

}
