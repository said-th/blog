import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Subscription} from 'rxjs';
import {SharedService} from './services/shared.service';
import {Meta, MetaData} from './data/MetaData';
import {PostService} from './services/post.service';
import {TagService} from './services/tag.service';
import {MetaService} from './services/meta.service';
import {Post} from './data/PostData';

@Component({
  selector: 'app-root',
  template: `
      <app-header [defaultImage]="defaultImage" [meta]="meta"></app-header>
      <router-outlet></router-outlet>
      <app-footer [defaultImage]="defaultImage" [meta]="meta"></app-footer>
      <div id="preloader" *ngIf="loading">
          <div id="loader">
              <div class="line-scale">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
          </div>
      </div>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public meta: Meta;
  public defaultImage: string;
  public popularPosts: Post[];
  private subscription: Subscription;
  public loading: boolean;


  constructor(private postData: PostService, private tagData: TagService , private metaData: MetaService , private shared: SharedService) {
    this.meta = {};
    this.popularPosts = [{}];
  }

  ngOnInit(): void {
    this.defaultImage = this.shared.defaultImage;
    this.loading = true;
    const observables = [this.postData.getPopularPosts('6'), this.metaData.getSimpleMetaData()];
    this.subscription = forkJoin(observables).subscribe(
      ([popularPosts, metadata]: [Post[], Meta]) => {
        this.popularPosts = popularPosts;
        this.postData.popularPosts$.next(popularPosts);
        this.meta = metadata;
        this.loading = false;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
