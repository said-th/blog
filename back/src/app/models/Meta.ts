import {Social} from './Social';

export interface Meta {
  id?: string;
  blogName?: string;
  blogDescribtion?: string;
  blogLogo?: string;
  blogCreationDate?: string;
  about?: string;
  socials?: Social[];
}
