import {Component, OnInit} from '@angular/core';
import {PostService} from '../../services/post.service';
import {Post} from '../../data/PostData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public popularPosts: Post[];
  public loading: boolean;

  constructor(private postData: PostService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.popularPosts = [];
    this.postData.popularPosts$.subscribe((popularPosts) => {
      this.popularPosts = popularPosts;
      this.loading = popularPosts.length === 0;
    });
  }

}
