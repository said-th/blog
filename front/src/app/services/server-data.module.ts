import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MetaService} from './meta.service';
import {PostService} from './post.service';
import {TagService} from './tag.service';

const SERVICES = [
  MetaService,
  PostService,
  TagService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class ServerDataModule {
  static forRoot(): ModuleWithProviders<ServerDataModule> {
    return {
      ngModule: ServerDataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}
