import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { validateEmailFormControl } from 'src/app/shared/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SetupService } from 'src/app/service/setup.service';
@Component({
  selector: 'app-frsm-investigation',
  templateUrl: './frsm-investigation.component.html',
  styleUrls: ['./frsm-investigation.component.scss']
})
export class FrsmInvestigationComponent implements OnInit {
  panelOpenState = false;
  investigationForm: FormGroup;
  formErrors = {
    apierror: null
  };
  showLoader = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fBuilder: FormBuilder,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.investigationForm = this.fBuilder.group({
      startDate:['', Validators.compose([Validators.required])],
      endDate:['', Validators.compose([Validators.required])],
      role:['', Validators.compose([Validators.required])],
      type:['', Validators.compose([Validators.required])],
      company:['', Validators.compose([Validators.required])],
      building:['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    if (this.investigationForm.valid) {
      this.showLoader = true;
      this._setupService.investigation(this.investigationForm.value).subscribe((response) => {
        if (response) {
          this.showLoader = false;
          this.investigationForm.reset();
        } else {
          this.formErrors.apierror = `* ${response.error[0]}`;
        }
      }, (error) => {
        // this.toastr.error(error.error.message);
        // this.formErrors.apierror = error.error.message;
        this.showLoader = false;
      });
    }
  }

  reset(){
    this.investigationForm.reset();
  }

}

