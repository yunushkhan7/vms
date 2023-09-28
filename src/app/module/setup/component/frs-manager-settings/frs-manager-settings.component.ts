import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
@Component({
  selector: 'app-frs-manager-settings',
  templateUrl: './frs-manager-settings.component.html',
  styleUrls: ['./frs-manager-settings.component.scss']
})
export class FrsManagerSettingsComponent implements OnInit {
  panelOpenState = false;
  frsManagerForm: FormGroup;
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
    this.frsManagerForm = this.fBuilder.group({
      iPaddress:['', Validators.compose([Validators.required])],
      protocol:['', Validators.compose([Validators.required])],
      port:['', Validators.compose([Validators.required])],
      email:['', Validators.compose([Validators.required])],
      password:['', Validators.compose([Validators.required])],
    });
  }


  submit(): void {
    if (this.frsManagerForm.valid) {
      this.showLoader = true;
      this._setupService.frsManagerSetting(this.frsManagerForm.value).subscribe((response) => {
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
