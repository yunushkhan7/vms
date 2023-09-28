import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {


  API: string = environment.APIEndpoint;
  API_URL2: string = environment.APIEndpoint + 'v1/Modules/';
  constructor(
    private http: HttpClient,
  ) { 

   

  }

  login(data): Observable<any> {
    return this.http.post(`${this.API}v1/Authenticate/Authenticate`, data);
  }

  forgotPassword(email): Observable<any> {
    return this.http.get(`${this.API}v1/Authenticate/ForgotPassword?emailId=${email}`);
  }

  // updatePassword(newPassword): Observable<any> {
  //   return this.http.get(`${this.API}v1/Authenticate/UpdatePassword?newPassword=${newPassword}`);
  // }

  updatePassword(data,slug): Observable<any> {
    return this.http.get(`${this.API}v1/Authenticate/UpdatePassword`, { params: data,
      headers: new HttpHeaders({
        Authorization: `Bearer ${slug}`
      })
    });
  }

  forgotPasswordExpiredLink(slug): Observable<any> {
    return this.http.get(`${this.API}v1/Authenticate/ForgotPasswordExpiredLink`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${slug}`
      })
    });
  }

  

}
