import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthorService} from '../../services/author.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {TokenStorageService} from '../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public roles: string[] = [];
  public error: string;
  public submitted: boolean;
  private destroy$ = new Subject<any>();

  isLoggedIn = false;

  constructor(private fb: FormBuilder,
              private loginService: AuthorService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit(): void {
    this.submitted = true;
    this.error = '';
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
          this.tokenStorage.saveToken(data.message.accessToken);
          data.message.author.roles = data.message.author.roles.map(role => role.name);
          this.tokenStorage.saveUser(data.message.author);
          this.isLoggedIn = true;
          this.router.navigate(['/dashboard/posts/new']);
        },
        error => {
          this.error = 'There was an error with your login';
        });
    } else {
      this.error = 'There was an error with your login. please try again!';
    }
  }

  reloadPage(): void {
    window.location.reload();
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
