import {Observable} from 'rxjs';
import {Author} from '../models/Author';
import {Tag} from './TagData';

export interface Post {
  title?: string;
  timeToRead?: string;
  publicationDate?: string;
  modificationDate?: string;
  describtion?: string;
  cover?: any;
  slug?: string;
  tags?: Tag[];
  html?: string;
  author?: Author;
}

export abstract class PostData {
  abstract getPopularPosts(size: string): Observable<any>;

  abstract getPostBySlug(slug: string): Observable<Post>;

  abstract getPosts(tag: string, pageNumber: any, pageSize: any, query: string): Observable<any> ;

}
