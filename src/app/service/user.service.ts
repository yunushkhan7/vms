import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API: string = environment.APIEndpoint;
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getCurrentUser(data): Observable<any> {
    return this.http.get(`${this.API}v1/Authenticate/GetCurrentUserProfile`, data);
  }

  getUserList(data): Observable<any> {
    return this.http.post(`${this.API}v1/Users/GetUsers`, data);
  }

  saveAccount(data): Observable<any> {
    return this.http.post(`${this.API}v1/Users/Save`, data);
  }
  getAccounttById(id): Observable<any> {
    return this.http.get(`${this.API}v1/Users/GetUser?id=${id}`);
  }

  deleteAccount(id): Observable<any> {
    return this.http.get(`${this.API}v1/Users/Delete?id=${id}`);
  }

  updatePassword(data): Observable<any> {
    return this.http.post(`${this.API}v1/Users/ChangePassword?oldPassword=${encodeURIComponent(data?.oldPassword)}&newPassword=${encodeURIComponent(data?.newPassword)}`, '');
  }

}
