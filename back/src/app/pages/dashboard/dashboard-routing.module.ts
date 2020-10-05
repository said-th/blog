import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {FooterComponent} from './@theme/footer/footer.component';
import {SidebarComponent} from './@theme/sidebar/sidebar.component';
import {NavbarComponent} from './@theme/navbar/navbar.component';
import {TagsComponent} from './tags/tags.component';
import {ConfirmDialogComponent} from '../../shared/components/confirm-dialog/confirm-dialog.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: '',
    children: [
      {path: 'home', component: HomeComponent},
      {path: '', component: HomeComponent},
      {path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule)},
      {component: TagsComponent, path: 'tags'},
      {component: SettingsComponent, path: 'setting'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}

export const routingComponents = [
  FooterComponent,
  SidebarComponent,
  NavbarComponent,
  TagsComponent,
  SettingsComponent,
  HomeComponent
];
