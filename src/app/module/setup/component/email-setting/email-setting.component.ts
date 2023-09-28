import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';

@Component({
  selector: 'app-email-setting',
  templateUrl: './email-setting.component.html',
  styleUrls: ['./email-setting.component.scss']
})
export class EmailSettingComponent implements OnInit {
  panelOpenState = false;
  emailSettingForm: FormGroup;
  formErrors = {
    apierror: null
  };
  showLoader=false
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.emailSettingForm = this.fBuilder.group({
      smtpHostname:['', Validators.compose([Validators.required])],
      portNumber:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    if (this.emailSettingForm.valid) {
      this.showLoader = true;
      this._setupService.emailSetting(this.emailSettingForm.value).subscribe((response) => {
        this.showLoader = false;
        if (response) {
       
        } else {
          this.formErrors.apierror = `* ${response.error[0]}`;
        }
      }, (error) => {
        this.toastr.error(error.error.message);
        this.formErrors.apierror = error.error.message;
        this.showLoader = false;

      });
    }
  }
}
