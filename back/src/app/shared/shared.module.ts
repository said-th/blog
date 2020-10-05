import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './components/confirm-dialog/confirm-dialog.component';
import {ConfirmDialogService} from '../services/confirm-dialog.service';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
  ],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmDialogService]
})
export class SharedModule {
}
