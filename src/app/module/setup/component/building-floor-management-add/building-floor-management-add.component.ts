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
  selector: 'app-building-floor-management-add',
  templateUrl: './building-floor-management-add.component.html',
  styleUrls: ['./building-floor-management-add.component.scss']
})
export class BuildingFloorManagementAddComponent implements OnInit {

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
    private toastr: ToastrService,
    private _setupService: SetupService,
    private _toastService: ToastServiceService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      buildingName: ['', Validators.compose([Validators.required])],
      floorName:['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      floorNo: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      buildingId: ['', Validators.compose([])],
    },
    );

  }

  ngOnInit() {
  this.getbuildNameList()
  }

  selectBuilding(building){
      this.addForm.patchValue({
        buildingId:building?.id
      });
  }

  getEditObject() {
    this._setupService.getFloorManagementById(this.editId).subscribe((response) => {
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
      // let payLoad=this.addForm.value
      // payLoad['id']=this.editId
      if (this.isEditing) {
        let payLoad=this.addForm.value
        payLoad['id']=this.editId
        this._setupService.saveFloorManagement(payLoad)
          .subscribe(
            (response) => {
              this.showLoader = false;

              if (response?.status == "Ok") {
                this._toastService.showMSG(this.translate.instant('FRSM.UPDATE'))
                this.back();
                this.router.navigateByUrl('/setup/floor');
              }
              if (response?.status == "Error") {
                this._toastService.showMSG(response.message);
              }

              // if (response) {
              //   this._toastService.showMSG(this.translate.instant('FRSM.UPDATE'))
              //   this.back()
              // } else {
              // }
            },
            (error) => {
              this.showLoader = false;
            }
          );
      } else {
        this._setupService.saveFloorManagement(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;

            if (response?.status == "Ok") {
              this._toastService.showMSG(this.translate.instant('FRSM.SAVE'))
              this.back();
              this.router.navigateByUrl('/setup/floor');
            }
            if (response?.status == "Error") {
              this._toastService.showMSG(response.message);
            }

            // if (response) {
            //   this._toastService.showMSG(this.translate.instant('FRSM.SAVE'))
            //   this.back()
            // } else {
            // }
          },
          (error) => {
            this.showLoader = false;
          }
        );
      }
    }
  }

  getbuildNameList(): void {
    this._setupService.getBuildingName({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.buildNameList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }

back(){
  this.location.back()
}

}
