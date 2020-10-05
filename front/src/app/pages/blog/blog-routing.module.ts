import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BlogComponent} from './blog.component';

const routes: Routes = [
  {path: 'search/:query', component: BlogComponent},
  {path: 'search/:query/:page', component: BlogComponent},
  {path: 'tag/:tag/:page', component: BlogComponent},
  {path: 'tag/:tag', component: BlogComponent},
  {path: ':page', component: BlogComponent},
  {path: '', component: BlogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
