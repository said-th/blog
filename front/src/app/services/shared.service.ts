import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {MetaData} from '../data/MetaData';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  public defaultImage: string;
  public home$: BehaviorSubject<boolean>;
  public metadata: MetaData;

  constructor() {
    this.defaultImage = 'assets/images/images.jpeg';
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  counter(count: number): Array<number> {
    return new Array(count);
  }

}
