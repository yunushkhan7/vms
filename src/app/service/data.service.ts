import { Injectable } from '@angular/core';
import { ReplaySubject, BehaviorSubject } from 'rxjs';
import { JwtService } from './jwt.service';
import { encryptValue } from 'src/app/shared/common';
import { CommonService } from './common.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  invokeEvent: Subject<any> = new Subject();
  // for checking company is selected or not
  private isCompanySelectedSubject = new BehaviorSubject<boolean>(false);
  public isCompanySelected = this.isCompanySelectedSubject.asObservable();

  // for storing current company details
  private currentCompanySubject = new BehaviorSubject(null);
  public currentCompany = this.currentCompanySubject.asObservable();

  // for storing current user details
  public currentUserSubject = new BehaviorSubject(null);
  public currentUser = this.currentUserSubject.asObservable();

  // for checking user is authneticated or not
  public isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // for storing common lists details
  private commonListSubject = new BehaviorSubject(null);
  public commonList = this.commonListSubject.asObservable();

  // for storing current user permission details
  public userPermissionSubject = new BehaviorSubject(null);
  public permission = this.userPermissionSubject.asObservable();

  // for storing current company details
  public forgatAuthSubject = new BehaviorSubject(null);
  public forgatAuth = this.forgatAuthSubject.asObservable();
  authUser: any;
  constructor(
    private jwtService: JwtService,
    private commonService: CommonService
  ) {}

  saveToken(token) {
    this.jwtService.saveToken(encryptValue(token));
  }

  saveCommonList(data) {
    this.commonListSubject.next(data);
  }

  setAuth(data) {
    this.saveToken(data?.data?.['jwtToken']);
    this.authUser = data;
    this.updateAuth({ ...data?.data?.user });
    this.updatePermission(data?.data?.permissions);
  }

  updateAuth(data) {
    this.currentUserSubject.next(data);
    this.isAuthenticatedSubject.next(true);
  }

  updatePermission(data) {
    let permissionModify = data;
    let permissionObject: any = {};
    permissionModify.forEach((e) => {
      let body: any = {};
      e.permissions.forEach((permission: any) => {
        body[String(permission).toLowerCase().trim()] = true;
      });
      permissionObject[e.name] = body;
    });
    this.userPermissionSubject.next({ permissions: permissionObject });
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);
    this.userPermissionSubject.next([]);
  }

  purgeCompany() {
    this.jwtService.destroyCompanyId();
  }

  callLogoutMethod() {
    this.invokeEvent.next(1);
  }
}
