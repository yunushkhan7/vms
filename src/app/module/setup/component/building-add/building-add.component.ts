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
  selector: 'app-building-add',
  templateUrl: './building-add.component.html',
  styleUrls: ['./building-add.component.scss']
})
export class BuildingAddComponent implements OnInit {

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
  submitted :boolean;

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
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      buildingName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
    },
    );

  }

  ngOnInit() {
  }


  getEditObject() {
    this._setupService.getBuildingById(this.editId).subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
      } else {
        this.router.navigateByUrl('/company');
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
        this._setupService.saveBuilding(payLoad)
          .subscribe(
            (response) => {
              this.showLoader = false;

              if (response?.status == "Ok") {
                this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
                this.back();
                this.router.navigateByUrl('/setup/building');
              }
              if (response?.status == "Error") {
                this._toastService.showMSG(response.message);
              }


              // if (response) {
              //   this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
              //   this.back()
              // } else {
              // }
            },
            (error) => {
              this.showLoader = false;
              this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
            }
          );
      } else {
        this._setupService.saveBuilding(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {

              if (response?.status == "Ok") {
                this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
                this.back();
                this.router.navigateByUrl('/setup/building');
              }
              if (response?.status == "Error") {
                this._toastService.showMSG(response.message);
              }

              // this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
              // this.back()
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
