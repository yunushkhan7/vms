import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateEmailFormControl } from 'src/app/shared/common';
import { ToastrService } from 'ngx-toastr';
import { FrsmSettingsService} from 'src/app/service/frsm-settings.service';
@Component({
  selector: 'app-frsm-smtp',
  templateUrl: './frsm-smtp.component.html',
  styleUrls: ['./frsm-smtp.component.scss']
})
export class FrsmSmtpComponent implements OnInit {
  panelOpenState = false;
  frsmSMTPForm: FormGroup;
  formErrors = {
    apierror: null
  };
  showLoader = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fBuilder: FormBuilder,
    private _frsmSettingsService: FrsmSettingsService,
  ) { }

  ngOnInit(): void {
    this.frsmSMTPForm = this.fBuilder.group({
      id:['', ],
      createdBy:['', ],
      createdDate:['', ],
      updatedBy:['', ],
      updatedDate:['', ],
      tempSortColumn:['', ],
      isDeleted:['', ],
      host:['', Validators.compose([Validators.required])],
      portNumber:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    if (this.frsmSMTPForm.valid) {
      this.showLoader = true;
      this._frsmSettingsService.frsmSMTP(this.frsmSMTPForm.value).subscribe((response) => {
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
