import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {Meta} from '../../data/MetaData';
import {PostService} from '../../services/post.service';
import {Post} from '../../data/PostData';
import {Tag} from '../../data/TagData';
import {TagService} from '../../services/tag.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit, OnDestroy {

  @Input() public defaultImage: string;
  @Input() public meta: Meta;
  public popularPosts: Post[];
  public tags: Tag[];
  private subscriptionTags: Subscription;


  constructor(private postData: PostService, private tagData: TagService) {
    this.tags = [];
    this.meta = {};
  }

  ngOnInit(): void {
    this.subscriptionTags = this.tagData.getTags().subscribe(tags => {
      this.tags = tags;
    });
    this.postData.popularPosts$.subscribe((popularPosts) => {
      this.popularPosts = popularPosts;
    });
  }

  onActivate(): void {
    // this.shared.scrollTop();
  }

  ngOnDestroy(): void {
    this.subscriptionTags.unsubscribe();
  }

}
