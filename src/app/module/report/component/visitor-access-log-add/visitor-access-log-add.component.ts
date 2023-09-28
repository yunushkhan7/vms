import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
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
  selector: 'app-visitor-access-log-add',
  templateUrl: './visitor-access-log-add.component.html',
  styleUrls: ['./visitor-access-log-add.component.scss']
})
export class VisitorAccessLogAddComponent implements OnInit {
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

  selectedFiles: any;
  url: any;
  base64textIdImage:any
  selectedIdImage: any;
  submitted:boolean
  base64textVisitorImage:any
  selectedVisitorImage
  FloorManagementList:any
  visitorRegistrationsHours:[]
  kisokList:any
  companyList:any
  days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
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
      visitorName: ['', Validators.compose([Validators.required])],
      // idPhotoImage: ['', Validators.compose([Validators.required])],
      // visitorImage: ['', Validators.compose([Validators.required])],
      // idNumber: ['', Validators.compose([Validators.required])],
      // kioskName: ['', Validators.compose([Validators.required])],
      // kioskBuilding: ['', Validators.compose([Validators.required])],
      // event: ['', Validators.compose([Validators.required])],
      // eventTime: ['', Validators.compose([Validators.required])],
      // companyName: ['', Validators.compose([Validators.required])],
      // phone: ['', Validators.compose([Validators.required])],
      // overriddenBy:['', Validators.compose([Validators.required])],
      // self: [false, Validators.compose([Validators.required])],
      remarks: ['', Validators.compose([Validators.required])],
    },
    );

  }


  ngOnInit() {
  // this.getbuildNameList()
  // this.getGetAllkisoksList()
  // this.getCompanyManagements()
  }

  getGetAllkisoksList(): void {
    this._setupService.getGetAllkisoksList({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.kisokList = response?.data;
        } else {
        }
      },
      (error) => {
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
        this.showLoader = false;
      }
    );
  }

  getbuildNameList(): void {
    this._setupService.getBuildingName({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.buildNameList=response?.data
      } else {
      }
    }, (error) => {
      this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
      this.showLoader = false;

    });
  }

  getCompanyManagements(): void {
    this._setupService.getCompanyManagements({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.companyList = response?.data;
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
      }
    );
  }

  getEditObject() {
    this._setupService.getCheckInReportById(this.editId).subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
      } else {
        this.router.navigateByUrl('/company');
      }
    });
  }

  submitForm() {
    if (this.addForm.valid) {
      this.addForm.get('idPhotoImage').setValue(this.base64textIdImage)
      this.addForm.get('visitorImage').setValue(this.base64textVisitorImage)
      this.showLoader = true;
      if (this.isEditing) {
        let payLoad=this.addForm.value
        payLoad['id']=this.editId
        this._setupService.saveCheckInReport(payLoad)
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
        this._setupService.saveCheckInReport(this.addForm.value).subscribe(
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

// idImage
idImageChangeEvent(fileInput: any) {
  const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
  if (!fileInput.target.files[0].name.match(reg)) {
    this.removeIdImage();
    return false;
  } else {
    this.removeIdImage();
    this.selectedIdImage = fileInput.target.files[0];
    this.addForm.patchValue({
      idPhotoImage: this.selectedIdImage.name
    });
    var reader = new FileReader();
    reader.onload = this.handleReaderLoadedIdImage.bind(this);
    reader.readAsBinaryString(this.selectedIdImage);
  }
}

handleReaderLoadedIdImage(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.base64textIdImage = 'data:image/png;base64,' + btoa(binaryString);
}

removeIdImage() {
  this.selectedIdImage = null;
}

// visitorImage
visitorImageChangeEvent(fileInput: any) {
  const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
  if (!fileInput.target.files[0].name.match(reg)) {
    this.removeVisitorImage();
    return false;
  } else {
    this.removeVisitorImage();
    this.selectedVisitorImage = fileInput.target.files[0];
    this.addForm.patchValue({
      visitorImage: this.selectedVisitorImage.name
    });
    var reader = new FileReader();
    reader.onload = this.handleReaderLoadedVisitorImage.bind(this);
    reader.readAsBinaryString(this.selectedVisitorImage);
  }
}

handleReaderLoadedVisitorImage(readerEvt) {
  var binaryString = readerEvt.target.result;
  this.base64textVisitorImage = 'data:image/png;base64,' + btoa(binaryString);
}

removeVisitorImage() {
  this.selectedVisitorImage = null;
}

onBlackList() {
  this.submitted=true
  this._setupService.VisitorBlackingid(this.editId, this.addForm.value?.remarks,{}).subscribe(
    (res) => {
      if (res) {
        this._toastService.showMSG(res.message);
        this.router.navigateByUrl('black-list');
      } 
      if (res.status = 'Error') {
        this._toastService.showMSG(res.message);
      }
    },
    (err) => {
      // this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
    }
  );
}

}
