import {Observable, throwError} from 'rxjs';
import {Post} from '../models/Post';
import {Response} from '../models/Response';
import {Author} from '../models/Author';


export abstract class PostData {

  abstract addPost(post: Post): Observable<Response> ;

  abstract updatePost(post: Post): Observable<Response> ;

  abstract publishPost(post: Post): Observable<Response> ;

  abstract deletePost(id: string): Observable<Response> ;

  abstract getPostBySlug(slug: string): Observable<Post> ;

  abstract getPosts(pageNumber: any, pageSize: any, author: Author): Observable<any> ;

  errorHandler(error): Observable<never> {
    return throwError('Error : ' + error.message);
  }
}
