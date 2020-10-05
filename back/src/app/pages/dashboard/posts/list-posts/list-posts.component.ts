import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from '../../../../services/post.service';
import {Post} from '../../../../models/Post';
import {Observable, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {Author} from '../../../../models/Author';
import {ConfirmDialogService} from '../../../../services/confirm-dialog.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit, OnDestroy {

  public asyncPosts: Observable<Post[]>;
  public currentPage: any;
  public totalItems: any;
  public itemsPerPage: any;
  public author: Author;

  private publishPostsubscription: Subscription;
  private confirmDialogSubscription: Subscription;
  private deletePostSubscription: Subscription;

  public message: string;

  constructor(private postService: PostService,
              private storage: TokenStorageService,
              private confirmDialogService: ConfirmDialogService,
              private toast: ToastrService) {
  }


  ngOnInit(): void {
    this.currentPage = 0;
    this.itemsPerPage = 10;
    this.totalItems = 0;
    this.author = this.storage.getUser();
    this.getPosts(1);

    this.confirmDialogSubscription = this.confirmDialogService.getMessage().subscribe(message => {
      this.message = message;
    });
  }


  getPosts(page: any): any {
    this.asyncPosts = this.postService.getPosts(page - 1, this.itemsPerPage, this.author).pipe(tap(response => {
      this.currentPage = page;
      this.totalItems = response.totalElements;
    }), map((res) => {
      return res.content;
    }));
  }


  removePost(id: string): void {
    this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
      this.deletePostSubscription = this.postService.deletePost(id).subscribe(response => {
        this.toast.success(response.message, 'Success');
        this.getPosts(this.currentPage);
      }, error => {
        this.toast.error(error.message, 'Error');
      });
    }, () => {
    });
  }


  publish(post: Post): void {
    post.published = !post.published;
    this.publishPostsubscription = this.postService.publishPost(post).subscribe(response => {
        this.toast.success(response.message, 'Success');
      },
      error => {
        this.toast.error(error.message, 'Error');
      });
  }


  trackPost(index, post): any {
    return post ? post.id : undefined;

  }

  ngOnDestroy(): void {
    this.publishPostsubscription?.unsubscribe();
    this.confirmDialogSubscription?.unsubscribe();
    this.deletePostSubscription?.unsubscribe();
  }


}
