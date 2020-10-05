import {Social} from './Social';
import {Address} from './Address';

export interface Author {
  image?: string;
  legalName?: string;
  description?: string;
  socials?: Social[];
  addresses?: Address[];
}
