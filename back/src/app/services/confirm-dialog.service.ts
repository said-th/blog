import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class ConfirmDialogService {
  private subject = new Subject<any>();

  confirmThis(message: string, yes: () => void, no: () => void): any {
    this.setConfirmation(message, yes, no);
  }

  setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      yes(): any {
        that.subject.next(); // This will close the modal
        yesFn();
      },
      no(): any {
        that.subject.next();
        noFn();
      }
    });

  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
