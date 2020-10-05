import {Social} from '../models/Social';
import {Observable} from 'rxjs';

export interface Meta {
  blogName?: string;
  blogDescribtion?: string;
  blogLogo?: string;
  blogCreationDate?: string;
  about?: string;
  socials?: Social[];
}


export abstract class MetaData {
  abstract getSimpleMetaData(): Observable<Meta>;
  abstract getDetailedMetaData(): Observable<Meta>;
}
