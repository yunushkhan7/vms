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
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
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
  id:any
  url: any;

  panelOpenState2: boolean = false;
  step2 = 0;

  panelOpenState1: boolean = false;
  step1 = 0;

  panelOpenState: boolean = false;
  step = 0;
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
    this.addForm = this.fb.group({
      logDays: ['', Validators.compose([Validators.required])],
      reports: ['', Validators.compose([Validators.required])],
      entryMode: ['', Validators.compose([Validators.required])],
      termsAndConditions: ['', Validators.compose([Validators.required])],
    },
    );

    this.getEditObject();
  }

  ngOnInit() {
    console.log("add==>",this.addForm)
  }


  getEditObject() {
    this._setupService.getDataRetention().subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
        this.id=response?.data?.id
      } else {
        this.router.navigateByUrl('/company');
      }
    });
  }

  submitForm() {
    this.submitted = true
    if (this.addForm.valid) {
      this.showLoader = true;
      let payLoad=this.addForm.value
      payLoad['id']=this.id
      this._setupService.saveDataRetention(payLoad)
      .subscribe(
        (response) => {
          this.showLoader = false;
          if (response?.data) {
            this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
            this.getEditObject()
          }
        },
        (error) => {
          this.showLoader = false;
          this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
        }
      );
    }
  }

back(){
  this.location.back()
}

setStep2(index: number) {
  this.step2 = index;
  this.panelOpenState2 = true;
}

reset(){
  this.addForm.reset();
  // window.location.reload();
}
}
