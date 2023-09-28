import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { maxValue } from 'src/app/shared/common';

@Component({
  selector: 'app-frsm-acs-server',
  templateUrl: './frsm-acs-server.component.html',
  styleUrls: ['./frsm-acs-server.component.scss']
})
export class FrsmAcsServerComponent implements OnInit {
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

  panelOpenState2: boolean = false;
  step2 = 0;

  panelOpenState1: boolean = false;
  step1 = 0;

  panelOpenState: boolean = false;
  step = 0;
  id:any;
  submitted :boolean;

  constructor(
    private fb: FormBuilder,
    public location: Location,
    private _toastService: ToastServiceService,
    private _frsmSettingsService: FrsmSettingsService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) { this.getEditObject(); }
    }
    this.addForm = this.fb.group({
      // staffCardRangeStart: ['', Validators.compose([Validators.required])],
      // staffCardRangeEnd: ['', Validators.compose([Validators.required])],
      visitorCardRangeStart: ['', Validators.compose([Validators.required])],
      visitorCardRangeEnd: ['', Validators.compose([Validators.required])]
    });


  }

  ngOnInit() {
    this.getAcsServerData();
  }

  checkValue(){
    this.submitted = true
    if(parseInt(this.addForm.value.visitorCardRangeStart) > parseInt(this.addForm.value.visitorCardRangeEnd)){
      this.addForm.get('visitorCardRangeEnd')?.reset();
    }
  }

  checkStaffValue(){
    this.submitted = true
    if(parseInt(this.addForm.value.staffCardRangeStart) > parseInt(this.addForm.value.staffCardRangeEnd)){
      this.addForm.get('staffCardRangeEnd')?.reset();
    }
  }

  getEditObject() {
    this._frsmSettingsService.getALLACSServer().subscribe((response) => {
      if (response?.data) {
        this.addForm.patchValue(response?.data);
        // this.editId=response?.data?.id
      } else {
        //this.router.navigateByUrl('/company');
      }
    });
  }

  getAcsServerData(){
    this._frsmSettingsService.getALLACSServer().subscribe(
      (response) => {
        this.showLoader = false;
        if (response) {
          this.id=response?.data?.id
          this.addForm.patchValue(response?.data);
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  submitForm() {
    this.submitted = true
    if (this.addForm.valid) {
      this.showLoader = true;
      let payLoad=this.addForm.value
        payLoad['id']=this.id
        this._frsmSettingsService.saveACSServer(payLoad)
          .subscribe(
            (response) => {
              this.showLoader = false;
              if (response) {
                this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
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

back(){
  this.location.back()
}

setStep2(index: number) {
  this.step2 = index;
  this.panelOpenState2 = true;
}

numberstr(phone){
  let number = phone.toString();
  return number;
}
reset(){
  this.addForm.reset();
}
}

