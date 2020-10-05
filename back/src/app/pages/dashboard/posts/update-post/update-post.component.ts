import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Tag} from '../../../../models/Tag';
import {TagService} from '../../../../services/tag.service';
import {PostService} from '../../../../services/post.service';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {Utils} from '../../../../shared/Utils';
import {Post} from '../../../../models/Post';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css']
})
export class UpdatePostComponent implements OnInit {

  public postForm: FormGroup;
  private quill: any;


  public tags: Tag[];


  constructor(private fb: FormBuilder,
              private tagService: TagService,
              private postService: PostService,
              private token: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastrService) {
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    this.postForm = this.fb.group({
      id: [''],
      publicationDate: [''],
      title: ['', [Validators.required, Validators.minLength(5)]],
      slug: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      cover: [''],
      html: [''],
      tags: ['']
    });
    this.postService.getPostBySlug(slug).subscribe(response => {
      this.postForm.patchValue(response);
    });
    this.tagService.getTags().subscribe(tags => this.tags = tags);
  }

  set cover(image: string) {
    this.postForm.get('cover').setValue(image);
  }

  get cover(): string {
    return this.postForm.get('cover').value;
  }

  get title(): string {
    return this.postForm.get('title').value;
  }


  submit(): void {
    const post: Post = {
      id: this.postForm.controls.id.value,
      author: this.token.getUser().username,
      cover: this.postForm.controls.cover.value,
      description: this.postForm.controls.description.value,
      html: this.quill?.html || '',
      modificationDate: (new Date()).toISOString(),
      publicationDate: this.postForm.controls.publicationDate.value,
      slug: this.postForm.controls.slug.value,
      timeToRead: Utils.timeToRead(this.quill?.text || ''),
      title: this.postForm.controls.title.value,
    };

    post.tags = this.postForm.controls.tags.value.map((tag) => {
      return tag.label;
    });

    // console.log(post);
    // post.timeToRead = Utils.timeToRead(post.html);

    this.postService.updatePost(post).subscribe(response => {
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

}
