import {Observable} from 'rxjs';

export interface Tag {
  label?: string;
  color?: string;
}


export abstract class TagData {
  abstract getTags(): Observable<Tag[]>;
}
