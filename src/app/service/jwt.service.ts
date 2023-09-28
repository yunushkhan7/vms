import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  getToken(): string {
    return window.sessionStorage['_auth_ecom'];
  }

  saveToken(token: string) {
    window.sessionStorage['_auth_ecom'] = token;
  }

  destroyToken() {
    window.sessionStorage.removeItem('_auth_ecom');
  }


  destroyCompanyId() {
    window.sessionStorage.removeItem('__ecom__cmp');
  }

  saveValue(name, value) {
    window.sessionStorage[name] = value;
  }

  destroyValue(name) {
    window.sessionStorage.removeItem(name);
  }

  getValue(name): string {
    return window.sessionStorage[name]; // window.sessionStorage['google_token'];
  }

  

  destroyRefreshToken() {
    window.sessionStorage.removeItem('refreshToken');
  }
}
