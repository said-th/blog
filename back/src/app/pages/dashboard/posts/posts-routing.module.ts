import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostsComponent} from './posts.component';
import {NewPostComponent} from './new-post/new-post.component';
import {ListPostsComponent} from './list-posts/list-posts.component';
import {UpdatePostComponent} from './update-post/update-post.component';
import {ConfirmDialogComponent} from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import {PhotoBase64UploadComponent} from '../../../shared/components/photo-base64-upload/photo-base64-upload.component';

const routes: Routes = [
  {
    component: PostsComponent,
    path: '',
    children: [
      {path: 'new', component: NewPostComponent},
      {path: 'list', component: ListPostsComponent},
      {path: 'update/:slug', component: UpdatePostComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {
}

export const routingComponents = [
  NewPostComponent,
  ListPostsComponent,
  UpdatePostComponent,
  PhotoBase64UploadComponent
];
