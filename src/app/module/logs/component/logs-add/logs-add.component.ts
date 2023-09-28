import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { emailRegEx, keyPressAddress, keyPressAlpha } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastrService } from 'ngx-toastr';
import { ToastServiceService } from 'src/app/service/toast-service.service';

@Component({
  selector: 'app-logs-add',
  templateUrl: './logs-add.component.html',
  styleUrls: ['./logs-add.component.scss']
})
export class LogsAddComponent implements OnInit {
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
  completeDate: Date;
  localCompleteDate;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public translate: TranslateService,
    public location: Location,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    private translateService: TranslateService,
  ) {
    this.completeDate = new Date('2022-08-20T12:00:01.659Z');
    this.localCompleteDate = this.completeDate.toISOString();
    this.localCompleteDate = this.localCompleteDate.substring(0, this.localCompleteDate.length - 1)
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }


    }

    this.addForm = this.fb.group({
      eventType: ['', Validators.compose([Validators.required])],
      eventTime: ['', Validators.compose([Validators.required])],
      owner: ['', Validators.compose([Validators.required])],
      message: ['', Validators.compose([Validators.required])],
    },
    );

  }

  ngOnInit() {
  }


  getEditObject() {
    this._setupService.getVisitorAccessLogById(this.editId).subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
      } else {
        this.router.navigateByUrl('/company');
      }
    });
  }

  submitForm() {
    if (this.addForm.valid) {
      this.showLoader = true;
      if (this.isEditing) {
        let payLoad=this.addForm.value
        payLoad['id']=this.editId
        this._setupService.saveVisitorAccessLogs(payLoad)
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
              this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
              this.showLoader = false;
            }
          );
      } else {
        this._setupService.saveVisitorAccessLogs(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
              this.back()
            } else {
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

}
