import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../services/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  public isProfileOpen: boolean;
  public isMessagesOpen: boolean;
  public isNotificationsOpen: boolean;

  constructor(private tokenService: TokenStorageService , private router:Router) {
  }

  ngOnInit(): void {
    this.isMessagesOpen = this.isNotificationsOpen = this.isProfileOpen = false;
  }

  toggleProfile(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleMessages(): void {
    this.isMessagesOpen = !this.isMessagesOpen;
  }

  toggleNotification(): void {
    this.isNotificationsOpen = !this.isNotificationsOpen;
  }

  signOut(): void {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

}
