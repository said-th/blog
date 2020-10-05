import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Author} from '../../models/Author';
import {PasswordValidator} from '../../shared/password.validaror';
import {AuthorService} from '../../services/author.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public error: string;
  public registered: boolean;
  public submitted: boolean;
  private destroy$ = new Subject<any>();

  constructor(private fb: FormBuilder, private registerService: AuthorService) {
  }

  ngOnInit(): void {
    this.submitted = this.registered = false;
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    }, {validators: PasswordValidator});
  }

  get username(): string {
    return this.registerForm.get('username').value;
  }

  get password(): string {
    return this.registerForm.get('password').value;
  }

  get email(): string {
    return this.registerForm.get('email').value;
  }

  get firstName(): string {
    return this.registerForm.get('firstName').value;
  }

  get lastName(): string {
    return this.registerForm.get('lastName').value;
  }

  submit(): void {
    this.submitted = true;
    this.error = '';
    if (this.registerForm.valid) {
      const author = {
        legalName: this.firstName + ' ' + this.lastName,
        username: this.username,
        password: this.password,
        email: this.email
      };
      this.registerService.register(author).pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.registered = true;
        },
        error => {
          this.error = error.error.message;
        });
    } else {
      this.error = 'There was an error with your registration. please try again!';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
