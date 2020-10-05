import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagService} from '../../../services/tag.service';
import {Tag} from '../../../models/Tag';
import {ToastrService} from 'ngx-toastr';
import {ConfirmDialogService} from '../../../services/confirm-dialog.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit, OnDestroy {


  public tags: Tag[];
  public tagForm: FormGroup;
  public manage: boolean;

  private getAllTagsSubscription: Subscription;
  private saveTagSubscription: Subscription;
  private removeTagSubscription: Subscription;

  constructor(private tagService: TagService, private toast: ToastrService, private confirmDialogService: ConfirmDialogService) {
  }

  ngOnInit(): void {
    this.getTags();
    this.tagForm = new FormGroup({
      id: new FormControl(''),
      label: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
    });
  }

  getTags(): void {
    this.getAllTagsSubscription = this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    });
  }


  removeTag(tag: any): void {
    this.confirmDialogService.confirmThis('Are you sure to delete?', () => {
      this.removeTagSubscription = this.tagService.removeTag(tag).subscribe(response => {
        this.toast.success(response.message, 'Success');
      }, error => {
        this.toast.error(error.message, 'Error');
      });
    }, () => {
    });
  }

  toggleEditOrAddModal(i: number): void {
    if (i !== -1) {
      this.tagForm.patchValue(this.tags[i]);
    } else {
      this.tagForm.reset();
    }
    this.manage = !this.manage;
  }

  save(): void {
    this.saveTagSubscription = this.tagService.saveTag(this.tagForm.value).subscribe(response => {
      this.toast.success(response.message, 'Success');
      this.manage = false;
      this.getTags();
      this.tagForm.reset();
    }, error => {
      this.toast.error(error.message, 'Error');
    });

  }

  ngOnDestroy(): void {
    this.saveTagSubscription?.unsubscribe();
    this.removeTagSubscription?.unsubscribe();
    this.getAllTagsSubscription?.unsubscribe();
  }


}
