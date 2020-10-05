import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule, routingComponents} from './dashboard-routing.module';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [DashboardComponent, ...routingComponents],
  exports: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ToastrService]
})
export class DashboardModule {
}
