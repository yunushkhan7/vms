import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-frsm-qr-code-reader-add',
  templateUrl: './frsm-qr-code-reader-add.component.html',
  styleUrls: ['./frsm-qr-code-reader-add.component.scss']
})
export class FrsmQrCodeReaderAddComponent implements OnInit {
  addForm: FormGroup;
  showLoader = false;
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  buildNameList:any
  currentTenant: any;
  selectedCategory:any
  CategoryList :any;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  submitted :boolean
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private _toastService: ToastServiceService,
    private _frsmSettingsService: FrsmSettingsService,
    private translateService: TranslateService,
    private toastr: ToastrService,
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      ip: ['', Validators.compose([Validators.required,       Validators.pattern("^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$")])],
      port: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
    },
    );

  }

  ngOnInit() {
  }


  getEditObject() {
    this._frsmSettingsService.getQRCodeReaderById(this.editId).subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
      } else {
        //this.router.navigateByUrl('/company');
      }
    });
  }

  submitForm() {
    this.submitted = true
    if (this.addForm.valid) {
      this.showLoader = true;
      if (this.isEditing) {
        let payLoad=this.addForm.value
        payLoad['id']=this.editId
        this._frsmSettingsService.saveQRCodeReader(payLoad)
          .subscribe(
            (response) => {
              this.showLoader = false;
              if (response) {
                this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
                this.back()
              } else {
              }
            },
            (error) => {
              this.showLoader = false;
              this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
            }
          );
      } else {
        this._frsmSettingsService.saveQRCodeReader(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;
            if (response.status == 'Error') {
              this.toastr.error(response?.message);
              // this._toastService.showMSG(this.translateService.instant(response?.message))
            } else {
              this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
              this.back()
            }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
      }
    }
  }

back(){
  this.location.back()
}

omit_number(event) {
  var key;
  key = event.charCode;  //         key = event.keyCode;  (Both can be used)
  return ((key > 47 && key < 58) || key == 45 || key == 46);
}

}
