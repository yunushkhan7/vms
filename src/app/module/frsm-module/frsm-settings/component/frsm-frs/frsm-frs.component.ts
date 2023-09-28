import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
import { customValidator } from 'src/app/shared/common';
@Component({
  selector: 'app-frsm-frs',
  templateUrl: './frsm-frs.component.html',
  styleUrls: ['./frsm-frs.component.scss']
})
export class FrsmFrsComponent implements OnInit {
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
  submitted :boolean
  id:any
  hide = true;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    private _toastService: ToastServiceService,
    private _frsmSettingsService: FrsmSettingsService,
    private translateService: TranslateService,
  ) {
    this.addForm = this.fb.group({
      account: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      ip: ['', Validators.compose([Validators.required])],
      port: ['', Validators.compose([Validators.required])],
      portocol: ['', Validators.compose([Validators.required])],
    },
    );

    this.getEditObject();

  }

  ngOnInit() {
  }


  getEditObject() {
    this._frsmSettingsService.getFRservermanagment().subscribe((response) => {
      if (response?.data) {
        this.id=response?.data?.id
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
      let payLoad=this.addForm.value
      payLoad['id']=this.id
      this._frsmSettingsService.saveFRservermanagment(payLoad)
        .subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
             this.getEditObject()
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

reset(){
  this.addForm.reset();
}

omit_number(event) {
  var key;
  key = event.charCode;  //         key = event.keyCode;  (Both can be used)
  return ((key > 47 && key < 58) || key == 45 || key == 46);
}
space(event:any){
  if (event.target.selectionStart === 0 && event.code === 'Space'){
    event.preventDefault();
  }
 }
}

