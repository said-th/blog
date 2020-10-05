import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import decode from 'jwt-decode';
import {TokenStorageService} from './token-storage.service';

@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public token: TokenStorageService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = this.token.getToken();
    // decode the token to get its payload
    const tokenPayload = decode(token);
    if (
      !this.token.getToken() ||
      tokenPayload.role !== expectedRole
    ) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
