import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog-routing.module';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../../shared/shared.module';
import {BlogComponent} from './blog.component';
import {PostService} from '../../services/post.service';


@NgModule({
  declarations: [
    BlogComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    NgxPaginationModule,
    SharedModule
  ],
  exports: [BlogComponent],
  providers: [PostService]
})
export class BlogModule {
}
