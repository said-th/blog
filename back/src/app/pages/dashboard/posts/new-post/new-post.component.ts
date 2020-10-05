import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TagService} from '../../../../services/tag.service';
import {PostService} from '../../../../services/post.service';
import {Post} from '../../../../models/Post';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {Utils} from '../../../../shared/Utils';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Tag} from '../../../../models/Tag';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public postForm: FormGroup;
  private suffix: string;
  private quill: any;

  public tags: Tag[];

  constructor(private fb: FormBuilder,
              private tagService: TagService,
              private postService: PostService,
              private token: TokenStorageService,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      slug: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      cover: [''],
      tags: ['']
    });
    this.suffix = '-' + Utils.rand(10);
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }


  get title(): string {
    return this.postForm.get('title').value;
  }

  submit(): void {
    const post: Post = {
      author: this.token.getUser().username,
      cover: this.cover,
      description: this.postForm.controls.description.value,
      html: this.quill?.html || '',
      modificationDate: '',
      publicationDate: (new Date()).toISOString(),
      slug: this.postForm.controls.slug.value,
      timeToRead: Utils.timeToRead(this.quill?.text || ''),
      title: this.postForm.controls.title.value,
    };

    post.tags = this.postForm.controls.tags.value.map((tag) => {
      return tag.label;
    });
    this.postService.addPost(post).subscribe(response => {
        this.toast.success(response.message, 'Success');
        this.router.navigate(['/dashboard/posts/list']);
      },
      error => {
        this.toast.error(error.message, 'Error');
      });
  }

  quillChange(event): void {
    this.quill = event;
  }

  set cover(cover: string) {
    this.postForm.get('cover').setValue(cover);
  }

  get cover(): string {
    return this.postForm.get('cover').value;
  }


  changeSlug(): void {
    this.postForm.get('slug').setValue(Utils.slugify(this.title, this.suffix));
  }
}
