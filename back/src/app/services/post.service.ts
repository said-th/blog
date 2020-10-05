import {Injectable} from '@angular/core';
import {PostData} from '../data/PostData';
import {Post} from '../models/Post';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {catchError} from 'rxjs/operators';
import {Response} from '../models/Response';
import {Author} from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class PostService extends PostData {

  constructor(private http: HttpClient) {
    super();
  }

  addPost(post: Post): Observable<Response> {
    return this.http.post(environment.api + 'manage/post/add', post).pipe(catchError(this.errorHandler));
  }

  updatePost(post: Post): Observable<Response> {
    return this.http.post(environment.api + 'manage/post/update', post).pipe(catchError(this.errorHandler));
  }

  publishPost(post: Post): Observable<Response> {
    return this.http.get(environment.api + 'manage/post/update/publish', {
      params: {
        id: post.id,
        published: post.published
      }
    }).pipe(catchError(this.errorHandler));
  }

  deletePost(id: string): Observable<Response> {
    return this.http.get<Response>(environment.api + 'manage/post/delete/' + id).pipe(catchError(this.errorHandler));
  }

  getPostBySlug(slug: string): Observable<Post> {
    return this.http.get<Post>(environment.api + 'blog/post/' + slug).pipe(catchError(this.errorHandler));
  }

  getPosts(pageNumber: any, pageSize: any, author: Author): Observable<any> {
    const url = author ? environment.api + 'blog/post/author/' + author.username : environment.api + 'blog/posts';
    return this.http.get<any>(url, {
        params: {
          page: pageNumber,
          size: pageSize
        }
      }
    ).pipe(catchError(this.errorHandler));
  }
}
