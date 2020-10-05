import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EllipsisPipe} from '../pipes/ellipsis.pipe';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import {SeletonLoaderModule} from '../@theme/seleton-loader/seleton-loader.module';


@NgModule({
  declarations: [
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    LazyLoadImageModule,
    SeletonLoaderModule
  ],
  exports: [
    EllipsisPipe,
    LazyLoadImageModule,
    SeletonLoaderModule
  ]
})
export class SharedModule {
}
