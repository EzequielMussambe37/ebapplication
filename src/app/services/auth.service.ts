import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  isLogin: boolean = false;

  isAuthenticated() {
    return this.isLogin;
  }
}
