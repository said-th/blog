import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostRoutingModule} from './post-routing.module';
import {DisqusModule} from 'ngx-disqus';
import {PostComponent} from './post.component';
import {SharedModule} from '../../shared/shared.module';
import {HighlightDirective} from '../../directives/highlight.directive';
import {HighlightModule} from 'ngx-highlightjs';
import {TimeAgoExtendsPipe} from '../../pipes/time-ago.pipe';
import {PostService} from '../../services/post.service';

@NgModule({
  declarations: [
    PostComponent,
    HighlightDirective,
    TimeAgoExtendsPipe
  ],
  imports: [
    CommonModule,
    DisqusModule,
    PostRoutingModule,
    SharedModule,
    HighlightModule
  ],
  exports: [PostComponent],
  providers: [PostService]
})
export class PostModule {
}
