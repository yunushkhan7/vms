import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location, formatDate } from '@angular/common';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { CommonFunction, PasswordValidation } from 'src/app/shared/common';
import { MYCustomValidators } from 'src/app/shared/custom-validators';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  formErrors = {
    new_password: '',
    confirm_password: '',
  };
  showLoader = false;
  loginType = 'email';
  captchaValue: string = '';
  hide = true;
  hide1 = true;
  slug;
  slugTkn;
  slugDateTime;
  expiredDateTime;
  dateTime1: string;
  passwordexpired:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private dataService: DataService,
    private translateService: TranslateService,
    private _toastService: ToastServiceService,
    public location: Location,
    private datePipe: DatePipe
  ) {
    this.resetPasswordForm = this.fBuilder.group(
      {
        new_password: [
          '',
          [
            Validators.required,
            // check whether the entered password has a number
            // MYCustomValidators.patternValidator(/\d/, { hasNumber: true }),
            // check whether the entered password has upper case letter
            MYCustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true,
            }),
            // check whether the entered password has a lower case letter
            MYCustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true,
            }),
            // check whether the entered password has a special character
            MYCustomValidators.patternValidator(
              /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              { hasSpecialCharacters: true }
            ),
            Validators.minLength(8),
          ],
        ], // validatePassword
        confirm_password: ['', Validators.compose([Validators.required])],
      },
      {
        validator: MYCustomValidators.passwordValidation2(),
      }
    );
  }

  ngOnInit() {
    this.slug = document.URL.substring(document.URL.indexOf('=') + 1);
    this.slugTkn = this.slug.split('&expiretime=')[0];
    this.slugDateTime = this.slug.split('&expiretime=')[1];
    //this.expiredDateTime = new Date();
    this.dateTime1 = atob(decodeURIComponent(this.slugDateTime));


    let startdate = formatDate(this.dateTime1,'yyyy-MM-dd HH:mm:ss','en_US');
    let enddate = formatDate(this.getNowUTC(),'yyyy-MM-dd HH:mm:ss','en_US');

    // console.log(formatDate(this.dateTime1,'yyyy-MM-dd HH:mm:ss','en_US'));
    // console.log(formatDate(this.getNowUTC(),'yyyy-MM-dd HH:mm:ss','en_US'));

    if (startdate < enddate) {
      this._toastService.showMSG('This Link Has Been Expired!');
      this.router.navigateByUrl('/forgot-password');
    }

    this.forgotPasswordExpiredLink();
  }

  getNowUTC() {
    const now = new Date();
    return new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  }

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.showLoader = true;
      const formData = {
        newPassword: this.resetPasswordForm.value.confirm_password,
      };

      this.authService.updatePassword(formData, this.slugTkn).subscribe(
        (response) => {
          this.showLoader = false;
          if (response) {
            this._toastService.showMSG(response.message);
            // this.formErrors.success = `* ${response.message}`;
            this.router.navigateByUrl('/login');
            //setTimeout(() => { CommonFunction.resetForm(this.resetPasswordForm); }, 1000);
          } else {
            this._toastService.showMSG(response.status);
            //this.formErrors.error = `* ${response.error}`;
          }
        },
        (error) => {
          this.showLoader = false;
          this._toastService.showMSG(error.error.message);
          //  this.formErrors.error = `* ${error.error}`;
          this.showLoader = false;
        }
      );
    }
  }

  back() {
    // this.location.back();
    this.router.navigateByUrl('/login');
  }


  forgotPasswordExpiredLink(): void {
    this.authService.forgotPasswordExpiredLink(this.slugTkn).subscribe(
      (response) => {
        this.showLoader = false;
        if (response) {
          this.passwordexpired = response?.miscData;
          if(response?.miscData == true){
            this._toastService.showMSG(response.message);
          }
          // this._toastService.showMSG(response.message);
          // this.formErrors.success = `* ${response.message}`;
          // this.router.navigateByUrl('/login');
        } else {
          this._toastService.showMSG(response.status);
        }
      },
      (error) => {
      }
    );
  }

}
