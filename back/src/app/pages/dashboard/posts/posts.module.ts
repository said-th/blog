import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PostsRoutingModule, routingComponents} from './posts-routing.module';
import {PostsComponent} from './posts.component';
import {TagInputModule} from 'ngx-chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
  declarations: [PostsComponent, ...routingComponents],
  imports: [
    CommonModule,
    PostsRoutingModule,
    TagInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    QuillModule.forRoot()
  ],
})
export class PostsModule {
}
