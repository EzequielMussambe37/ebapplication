import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable() // basically needs when we also want to use a service inside a service..
export class UserGuardService implements CanActivate {
  constructor(private auth: AuthService, private routes: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.routes.navigate(['']);
    return false;
  }
}
