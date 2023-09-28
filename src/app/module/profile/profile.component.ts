import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { PasswordValidation } from 'src/app/shared/common';
import { emailRegEx } from 'src/app/shared/common';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/service/data.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { SetupService } from 'src/app/service/setup.service';
import { MYCustomValidators } from 'src/app/shared/custom-validators';
import {
  CountryISO,
  SearchCountryField,
  PhoneNumberFormat,
} from "ngx-intl-tel-input";
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentUser: any;
  role:any;
  permissionObject: any = null;

  hide = true;
  hide1 = true;
  hide2 = true;
  loadingState = true;
  addForm: FormGroup;
  validationMessages: any;
  formErrors = {
    old_password: '',
    new_password: '',
    confirm_password: '',
    apierror: '',
    emailId: null,
  };
  submitAttempt = false;
  showLoader = false;
  addProfileForm: FormGroup;
  isEditing = false;
  editId = null;
  pageTitle = 'Update Profile';
  editObject: any;
  isProfileEditable: boolean = false;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  base64textString:any;
  selectedProfileImage:any;
  submitted: boolean;
  id:any
  roleList: any;
  step2: number;
  panelOpenState2: boolean;
  editImageUrl: any = null;
  defaultProfileImage = 'https://ebcblob.blob.core.windows.net/ebc/DefaultUser.png'
  userFirstName:any;
  userLastName:any;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.Singapore];
  selectedCountryISO = CountryISO.Singapore;
  mySelectedCountryISO: CountryISO;
  primaryContact:any;
  isAddForm :any;
  inputedit:boolean= false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private authService: AuthService,
    private translateService: TranslateService,
    private dataservice: DataService,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    public location: Location
  ) { 
    this.dataservice.currentUser.subscribe((res => {
      if (res) {
        this.currentUser = res
        this.isEditing = true;
        this.editId = this.currentUser?.id;
        this.editImageUrl = this.currentUser?.profileImage ? this.currentUser?.profileImage : this.defaultProfileImage;
        this.getEditObject();
      }
    }))
    if (this.isEditing) { this.getEditObject(); }
    this.addProfileForm = this.fb.group({
      userName: [""],
      emailId: ["", Validators.compose([Validators.required, Validators.pattern(emailRegEx)])],
      primaryContact:["", Validators.compose([Validators.required])],
      roleName:[""],
      firstName: [""],
      lastName: [""],
      profilePicture:["",Validators.compose([Validators.required])],
      roleId: ['', Validators.compose([])],
    });

    this.addForm = fb.group({
      old_password: [null, Validators.compose([Validators.required])],
      new_password: [null, [
        Validators.required,
        // check whether the entered password has a number
        MYCustomValidators.patternValidator(/\d/, { hasNumber: true }),
        // check whether the entered password has upper case letter
        MYCustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // check whether the entered password has a lower case letter
        MYCustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        // check whether the entered password has a special character
        MYCustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          { hasSpecialCharacters: true }
        ),
        Validators.minLength(8),
      ]],
      confirm_password: [null, Validators.compose([Validators.required])]
    }, {
      validator: MYCustomValidators.passwordValidation2()
    });

  }

  ngOnInit(): void {
    this.getRoles();
  }


  fileChangeEvent(fileInput: any) {
    const reg = /(.*?)\.(jpg|jpeg|png|gif|giff)$/;
    if (!fileInput.target.files[0].name.match(reg)) {
      // this.toastService.showError(
      //   this.translateService.instant('ADMIN.SELECT')
      // );
      this.removeFile();
      return false;
    } else {
      this.removeFile();
      this.selectedFile = fileInput.target.files[0];
      var reader = new FileReader();
      reader.onload = this.handleReaderLoaded.bind(this);
      reader.readAsBinaryString(this.selectedFile);
    }
  }
  removeFile() {
    this.selectedFile = null;
  }
  handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = 'data:image/png;base64,' + btoa(binaryString);
  }

  editingInputClick(){
    this.inputedit = true
  }
  
  getEditObject() {
    this.userService.getAccounttById(this.editId).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
        this.primaryContact = response?.data?.primaryContact.substring(3,11);
        this.role = response?.data?.user?.roleName;
        this.editObject = response?.data;
        this.userFirstName = response?.data?.firstName;
        this.userLastName = response?.data?.lastName;
        this.base64textString = this.editObject?.profilePicture;

        this.addProfileForm.patchValue(response?.data);
        this.isAddForm = this.addProfileForm.markAsTouched;
        this.addProfileForm.patchValue({
          primaryContact: this.primaryContact,
        });
      }
    });
  }

  async submitProfileForm() {
    this.showLoader = true;
    if (this.addProfileForm.valid) {
      if (this.isEditing) {
        let payLoad = this.addProfileForm.value
         payLoad['profilePicture']=this.base64textString
        payLoad['id']= this.editId
        payLoad["primaryContact"] = this.numberstr(this.addProfileForm?.value?.primaryContact?.e164Number);
        this.userService.saveAccount(payLoad).subscribe(
          (response) => {
          this.showLoader = false;
          if (response.status == 'Ok') {
            this.dataservice.updateAuth({ ...this.currentUser, ...response?.data });
            // this.toastService.success(
            //   this.translateService.instant('PROFILENEW.ERROR')
            // );
            this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
          } else {
            this.toastService.error(response.message);
          }
        }, (error) => {
          this.showLoader = false;
        });
      }
    }
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
  selectRole(role) {
    this.addForm.patchValue({
      roleId: role.id,
    });
  }

  submitForm(): void {
    this.submitAttempt = true;
    this.submitted = true
    if (this.addForm.valid) {
      this.showLoader = true;
      const formData = {
        oldPassword: this.addForm.value.old_password,
        newPassword: this.addForm.value.new_password
      };
      this.userService.updatePassword(formData).subscribe((response) => {
        this.showLoader = false;
        this.submitAttempt = false;
        if (response && response.status == "Error") {
          this.toastService.error(response.message);
          this.formErrors.old_password = null;
         
        } else {
          if(response?.message == 'Password Updated Successfully'){
            this.toastService.success(response.message);
            this.router.navigateByUrl('/profile');
          }
          if(response?.message !== 'Password Updated Successfully'){
            this.toastService.error(response.message);
          }
        }
      },
        (error) => {
          this.showLoader = false;
          this.submitAttempt = false;
          this.formErrors.apierror = `* Server Error`;
        }
      );
    }
  }


  setStep2(index: number) {
    this.step2 = index;
    this.panelOpenState2 = true;
  }


  numberstr(phone) {
    let number = phone.toString();
    return number;
  }

  back(){
    this.location.back();
  }
}
