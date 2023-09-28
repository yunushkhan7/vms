import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  emailRegEx,
  keyPressAddress,
  keyPressAlpha,
} from 'src/app/shared/common';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { CommonService } from 'src/app/service/common.service';
import {
  CountryISO,
  SearchCountryField,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";


@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.scss'],
})
export class AccountAddComponent implements OnInit {
  addForm: FormGroup;
  showLoader = false;
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  buildNameList: any;
  currentTenant: any;
  selectedCategory: any;
  CategoryList: any;
  selectedProfileFile: any;
  selectedFile: any;
  selectedFiles: any;
  url: any;
  base64textString: any;
  FloorManagementList: any;
  visitorRegistrationsHours: [];
  kisokList: any;
  roleList: any;
  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  submitted :boolean;
  currentUser: any;
  role:any;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Singapore];
  selectedCountryISO = CountryISO.Singapore;
  mySelectedCountryISO: CountryISO;
  primaryContact:any;
  secondaryContact:any;
  inputedit:boolean= false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public translate: TranslateService,
    public location: Location,
    private _setupService: SetupService,
    private _userService: UserService,
    private _toastService: ToastServiceService,
    private toastService: ToastrService,
    private translateService: TranslateService,
    private commonService: CommonService,
    private dataservice: DataService
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();        
      }
    }

    this.dataservice.currentUser.subscribe((res => {
      if (res) {
        this.currentUser = res
        // this.isEditing = true;
        // this.editId = this.currentUser?.id;
        // this.getEditObject();
      }
    }))

    this.addForm = this.fb.group({
      userName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      emailId: ['', Validators.compose([Validators.required, Validators.pattern(emailRegEx)])],
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      primaryContact: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      secondaryContact: ['', Validators.compose([])],
      roleId: ['', Validators.compose([])],
      roleName: ['', Validators.compose([Validators.required])],
      profilePicture: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this._setupService.getRoles({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.roleList = response?.data;
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  editingInputClick(){
    this.inputedit = true
  }
  getEditObject() {
    this._userService.getAccounttById(this.editId).subscribe((response) => {
      if (response?.data) {
        this.role = response?.data?.roleName
        this.addForm.patchValue(response?.data);
        this.primaryContact = response?.data?.primaryContact?.substring(3,11);
        this.secondaryContact = response?.data?.secondaryContact?.substring(3,11);
        this.addForm.patchValue({
          primaryContact: this.primaryContact,
          secondaryContact:this.secondaryContact
        });
      } else {
        this.router.navigateByUrl('/company');
      }
    });
  }

  selectRole(role) {
    this.addForm.patchValue({
      roleId: role.id,
    });
  }
  async submitForm() {
    this.submitted = true
    this.showLoader = true;
    if (this.addForm.valid) {
      // this.addForm.get('profilePicture').setValue(this.base64textString)
      this.showLoader = true;

      // if (this.selectedProfileFile) {
      //   const data = new FormData(); data.append('file', this.selectedProfileFile);
      //   await this.commonService.fileUpload(data).then((res: any) => { this.addForm.get('profilePicture').setValue(res.data); })
      // }

      if (this.isEditing) {
        let payLoad = this.addForm.value;
        payLoad['id'] = this.editId;
        payLoad['profilePicture']=this.base64textString
        payLoad["primaryContact"] = this.numberstr(this.addForm?.value?.primaryContact?.e164Number);
        payLoad["secondaryContact"] = this.numberstr(this.addForm?.value?.secondaryContact?.e164Number);
        this._userService.saveAccount(payLoad).subscribe((res: any) => {
          this.showLoader = false;
          if (res?.status == "Ok") {
            this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
            this.back();
          }
          if (res?.status == "Error") {
            this._toastService.showMSG(res.message);
          }
        },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
      } else {
        let payLoad = this.addForm.value
        payLoad['profilePicture']=this.base64textString
        payLoad["primaryContact"] = this.numberstr(this.addForm?.value?.primaryContact?.e164Number);
        payLoad["secondaryContact"] = this.numberstr(this.addForm?.value?.secondaryContact?.e164Number);
        this._userService.saveAccount(payLoad).subscribe((res:any) => {
            this.showLoader = false;
            if(res){
              if (res?.status == "Ok") {
                this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
                this.router.navigateByUrl('/setup/account');
                // this.back();
              }
              if (res?.status == "Error") {
                this._toastService.showMSG(res.message);
              }
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

  back() {
    this.location.back();
  }

  removeFile() {
    this.selectedFile = null;
  }

  fileChangeEvents(fileInput: any) {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
    if (!fileInput.target.files[0].name.match(reg)) {
      this.removeFile();
      return false;
    } else {
      this.removeFile();
      this.selectedFiles = fileInput.target.files[0];
      this.addForm.patchValue({
        profilePicture: this.selectedFiles.name,
      });
      var reader = new FileReader();
      reader.onload = this.handleReaderLoadeds.bind(this);
      reader.readAsBinaryString(this.selectedFiles);
    }
  }

  profileChangeEvent(fileInputFile: any) {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
    if (!fileInputFile.target.files[0].name.match(reg)) {
      this.toastService.error('Please select valid file');
      this.selectedProfileFile = null;
      return false;
    } else {
      this.selectedProfileFile = null;
      this.selectedProfileFile = fileInputFile.target.files[0];
      this.addForm.get('profilePicture').setValue(this.selectedProfileFile.name);
    }
  }

  handleReaderLoadeds(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
  }

  numberstr(phone) {
    let number = phone?.toString();
    return number;
  }
}
