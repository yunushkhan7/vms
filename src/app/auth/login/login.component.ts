import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateEmailFormControl } from 'src/app/shared/common';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  httpOptions = null;
  isRememberMe: boolean = false;
  LoginUser: any;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  loginForm: FormGroup;
  formErrors = {
    apierror: null,
  };
  showLoader = false;
  loginType = 'email';
  captchaValue: string = '';
  typedcheck = false;
  submitted: boolean;
  hide = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private dataService: DataService,
    private translateService: TranslateService,
    private _toastService: ToastServiceService
  ) {
    this.dataService.invokeEvent.subscribe((value) => {
      if (value === 1) {
        // this.resetcredentials();
      }
    });
  }

  ngOnInit() {
    this.loginForm = this.fBuilder.group({
      // Development team: Just keep this below code need to verify once system is stable
      // email: ['', Validators.compose([Validators.required, validateEmailFormControl])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      // isRememberMe: [false],
    });
    // alert('1 :' + this.isRememberMe);

    this.isRememberMe =
      sessionStorage.getItem('rememberCurrentUser') == 'true' ? true : false;

    // alert('12 :' + this.isRememberMe);

    if (this.isRememberMe == true) {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(sessionStorage.getItem('currentUser'))
      );
    } else {
      // this.currentUserSubject = new BehaviorSubject<any>(
      //   JSON.parse(sessionStorage.getItem('currentUser'))
      // );
    }
    this.currentUser = this.currentUserSubject?.asObservable();
    this.currentUser?.forEach((item) => {
      // this.loginForm.value.email = item?.emailId;
      // this.loginForm.value.password = item?.password;
      // this.loginForm.setValue({
      //   email: item?.emailId,
      //   password: item?.password,
      // });
      this.loginForm.patchValue({
        email: item?.emailId,
        password: item?.password,
      });
    });

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    //alert('123 :' + this.isRememberMe);
  }

  logIn(): void {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.showLoader = true;
      const formData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };
      this.authService.login(formData).subscribe(
        (response: any) => {
          this.showLoader = false;
          if (response) {
            if (
              response?.data?.permissions &&
              response?.data.permissions.length
            ) {
              this.dataService.setAuth(response);
              this.activatedRoute.snapshot.queryParamMap.get('next');
              const nextURL = this.activatedRoute.snapshot.queryParamMap.get(
                'next'
              )
                ? this.activatedRoute.snapshot.queryParamMap.get('next')
                : '/report';
              this.router.navigateByUrl(nextURL);
            } else {
              this._toastService.showMSG(response?.message);
            }
            this.LoginUser = response?.data?.user;
            this.LoginUser.password = this.loginForm.value?.password;
            if (this.isRememberMe) {
              this.resetcredentials();
              //your logged  out when you click logout

              sessionStorage.setItem(
                'currentUser',
                JSON.stringify(this.LoginUser)
              );
              sessionStorage.setItem('rememberCurrentUser', 'true');
            } else {
              //your logged  out when page/ browser is closed
              sessionStorage.setItem('rememberCurrentUser', 'false');
              // sessionStorage.setItem(
              //   'currentUser',
              //   JSON.stringify(this.LoginUser)
              // );
            }
            // login successful if there's a jwt token in the response
            this.isLoggedIn = true;
            this.currentUserSubject?.next(this.LoginUser);
          } else {
            this.formErrors.apierror = `* ${response.error[0]}`;
          }
        },
        (error) => {
          // this.toastr.error(error.error.message);
          // this.formErrors.apierror = error.error.message;
          this.showLoader = false;
        }
      );
    }
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }
  resetcredentials() {
    //clear all sessionStorages
    sessionStorage.setItem('rememberCurrentUser', 'false');
    sessionStorage.removeItem('currentUser');
    // sessionStorage.removeItem('currentUser');
    this.currentUserSubject?.next(null);
  }

  check() {
    this.typedcheck = !this.typedcheck;
  }
}
