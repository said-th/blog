import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../services/shared.service';
import {PostService} from '../../services/post.service';
import {Post} from '../../data/PostData';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit, OnDestroy {

  public asyncPosts: Observable<Post[]>;
  public currentPage: any;
  public totalItems: any;
  public itemsPerPage: any;
  public loading: boolean;
  public defaultImage: string;
  public empty: boolean;
  public searchQuery: string;
  public tag: string;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private shared: SharedService) {
  }

  ngOnInit(): void {
    this.currentPage = 0;
    this.itemsPerPage = 8;
    this.searchQuery = '';
    this.tag = '';
    this.defaultImage = this.shared.defaultImage;
    this.route.params.subscribe((param) => {
      this.empty = false;
      this.loading = true;
      this.getPosts(param);
    });
  }


  getPosts(param: any): any {
    this.searchQuery = param.query;
    this.tag = param.tag;
    this.currentPage = param.page ? param.page : 1;
    this.asyncPosts = this.postService.getPosts(this.tag, this.currentPage - 1, this.itemsPerPage, this.searchQuery).pipe(tap(response => {
      this.empty = response.empty;
      this.totalItems = response.totalElements;
      this.loading = false;
    }), map(res => res.content));
  }

  changePage(page: number): void {
    let commands = [];
    if (this.searchQuery) {
      commands = ['/blog/search', this.searchQuery, page];
    } else if (this.tag) {
      commands = ['/blog/tag', this.tag, page];
    }else{
      commands = ['/blog', page];
    }
    this.router.navigate(commands);
  }


  ngOnDestroy(): void {
    this.asyncPosts = null;
  }

  get counter(): Array<number> {
    return this.shared.counter(this.itemsPerPage);
  }
}
