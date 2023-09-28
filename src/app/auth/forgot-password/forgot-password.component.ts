import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateEmailFormControl } from 'src/app/shared/common';
import { DataService } from 'src/app/service/data.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup;
  formErrors = {
    apierror: null
  };
  showLoader = false;
  loginType = 'email'
  captchaValue: string = '';
  userObjectField:string = null;

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
  ) {


  }

  ngOnInit() {
    this.forgotPasswordForm = this.fBuilder.group({
      email: ['', Validators.compose([Validators.required, validateEmailFormControl])],
    });
  }


  verify(): void {
    this.showLoader = true;
    if (this.forgotPasswordForm.valid) {
      this.showLoader = true;
      this.authService.forgotPassword(this.forgotPasswordForm?.value?.email).subscribe((response) => {
        this.showLoader = false;
        if (response?.status=='Ok') {
           this._toastService.showMSG(response?.message)
           this.userObjectField ='';
          //  this.router.navigateByUrl('/login');
        } else {
          this.formErrors.apierror = `* ${response.error[0]}`;
        }
      }, (error) => {
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR3'))
        this.showLoader = false;

      });
    }
  }

  back(){
    this.location.back()
  }

}
