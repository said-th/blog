import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../data/PostData';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  public post: Post;
  private subscription: Subscription;
  public defaultImage: string;
  public loading: boolean;

  constructor(private postService: PostService, private route: ActivatedRoute, private shared: SharedService) {
    this.post = {};
  }


  ngOnInit(): void {
    this.defaultImage = this.shared.defaultImage;
    this.route.params.subscribe((param) => {
      this.loading = true;
      this.subscription = this.postService.getPostBySlug(param.slug).subscribe(post => {
        this.post = post;
        this.loading = false;
      });
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
