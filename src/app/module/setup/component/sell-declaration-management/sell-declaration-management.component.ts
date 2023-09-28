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
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sell-declaration-management',
  templateUrl: './sell-declaration-management.component.html',
  styleUrls: ['./sell-declaration-management.component.scss']
})
export class SellDeclarationManagementComponent implements OnInit {
  // panelOpenState = false;
  addForm: FormGroup;
  showLoader = false;
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  buildNameList: any
  currentTenant: any;
  selectedCategory: any
  CategoryList: any;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  FloorManagementList: any
  visitorRegistrationsHours: []
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  id: any
  questionaryList: any;
  
  panelOpenState2: boolean = false;
  step2 = 0;

  panelOpenState1: boolean = false;
  step1 = 0;

  panelOpenState: boolean = false;
  step = 0;
  submitted:boolean;
  inputedit:boolean= false;
  
  get f() { return this.addForm.controls; }
  get t() { return this.f['questionary'] as FormArray; }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public translate: TranslateService,
    public location: Location,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {


    this.addForm = this.fb.group({
      header: ['', Validators.compose([Validators.required])],
      footer: ['', Validators.compose([Validators.required])],
      questionary: new FormArray([])
    },
    );
    this.getEditObject();
  }



  ngOnInit() {
  }


  getEditObject() {
    this._setupService.getSelfDeceleration().subscribe((response) => {
      if (response?.data) {
        response?.data?.questionary.forEach(element => {
          this.questionaryList = element
          this.add(false)
        });
        this.id = response?.data?.id
        this.addForm.patchValue({
          header: response?.data?.header,
          footer: response?.data?.footer,
        });
      } else {
        this.router.navigateByUrl('/company');
      }
    });
  }

  submitForm() {
    this.submitted = true
    if (this.addForm.valid && this.t.valid) {
      this.showLoader = true;
      let payLoad = this.addForm.value
      payLoad['id'] = this.id
      payLoad.questionary.forEach((item, i) => {
        payLoad.questionary[i].passCriteria = (item?.passCriteria == 'Yes') ? true : false
      });
      this._setupService.saveSelfDeceleration(payLoad)
        .subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
              //   this.getEditObject()

            } else {
            }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
    }
    else{
      if(this.addForm.invalid && this.t.invalid){
        this._toastService.showMSG("Please Fill The  Question & Pass Criteria Question Field")
      }
      //this._toastService.showMSG(this.translateService.instant('FRSM.ERROR2'))
    }
  }

  back() {
    this.location.back()
  }

  add(isNewControl) {
    if (isNewControl) {
      this.t.push(this.fb.group({
        enable: [false, Validators.compose([Validators.required])],
        question: ['', Validators.compose([Validators.required])],
        passCriteria: ['', Validators.compose([Validators.required])],
      }));
    } else {
      this.t.push(this.fb.group({
        enable: [this.questionaryList?.enable, Validators.compose([Validators.required])],
        question: [this.questionaryList?.question, Validators.compose([Validators.required])],
        passCriteria: [(this.questionaryList?.passCriteria) ? 'Yes' : 'No', Validators.compose([Validators.required])],
      }));
    }
    
  }
  removeQuestionary(i) {
    this.t.removeAt(i);
    // this._toastService.showMSG(this.translateService.instant('FRSM.DELETE'))
    // this.submitForm2();
  }
  submitForm2() {
    if (this.addForm.valid && this.t.valid) {
      this.showLoader = true;
      let payLoad = this.addForm.value
      payLoad['id'] = this.id
      payLoad.questionary.forEach((item, i) => {
        payLoad.questionary[i].passCriteria = (item?.passCriteria == 'Yes') ? true : false
      });
      this._setupService.saveSelfDeceleration(payLoad)
        .subscribe(
          (response) => {
            this.showLoader = false;
          },
          (error) => {
            this.showLoader = false;
          }
        );
    }
  }


  setStep2(index: number) {
    this.step2 = index;
    this.panelOpenState2 = true;
  }


  space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault();
    }
  }


  editingInputClick(){
    this.inputedit = true
  }

  onDelete(i): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...i, isDelete: true },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this.removeQuestionary(i);
        this._toastService.showMSG(this.translateService.instant('FRSM.DELETE'))
           this.submitForm2();
      }
    });
  }

}
