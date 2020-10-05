import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule, routingComponents} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {DISQUS_SHORTNAME} from 'ngx-disqus';
import {SharedModule} from './shared/shared.module';
import {HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServerDataModule} from './services/server-data.module';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ServerDataModule.forRoot()
  ],
  bootstrap: [AppComponent],
  exports: [],
  providers: [
    {provide: DISQUS_SHORTNAME, useValue: 'said-thitah'},
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import('highlight.js'),
      }
    }
  ]
})
export class AppModule {
}
