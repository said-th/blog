import {Component, OnInit} from '@angular/core';
import {Author} from '../../../models/Author';
import {TokenStorageService} from '../../../services/token-storage.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Social} from '../../../models/Social';
import {Address} from '../../../models/Address';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  public author: Author;
  public authorForm: FormGroup;

  constructor(private storage: TokenStorageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.author = this.storage.getUser();
    this.authorForm = this.fb.group({
      username: ['' , Validators.required],
      currentPassword: [],
      newPassword: [],
      confirmNewPassword: [],
      email: ['' , Validators.required],
      legalName: ['' , Validators.required],
      description: ['' , Validators.required],
      socials: [],
      addresses: ['' , Validators.required],
      roles: [],
    });
    this.authorForm.patchValue(this.author);
  }


  get legalName(): string {
    return this.authorForm.get('legalName').value;
  }

  get username(): string {
    return this.authorForm.get('username').value;
  }


  saveAuthor(): void {
    console.log(this.authorForm);
  }

}
