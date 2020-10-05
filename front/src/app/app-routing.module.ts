import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AboutComponent} from './pages/about/about.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {ContactComponent} from './pages/contact/contact.component';
import {HeaderComponent} from './@theme/header/header.component';
import {FooterComponent} from './@theme/footer/footer.component';
const routes: Routes = [
  {path: 'blog', loadChildren: () => import('./pages/blog/blog.module').then(m => m.BlogModule)},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent},
  {path: 'post', loadChildren: () => import('./pages/post/post.module').then(m => m.PostModule)},
  {path: '', component: HomeComponent},
  {component: NotFoundComponent, path: '**'},
];
export const routingComponents = [AboutComponent, NotFoundComponent, HomeComponent, HeaderComponent, FooterComponent, ContactComponent];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled', scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
