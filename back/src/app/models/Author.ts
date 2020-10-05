import {Social} from './Social';
import {Address} from './Address';

export interface Author {
  id?: string;
  image?: string;
  username?: string;
  password?: string;
  email?: string;
  legalName?: string;
  description?: string;
  socials?: Social[];
  addresses?: Address[];
  roles?: string[];
}
