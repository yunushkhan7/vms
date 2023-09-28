import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password-popup',
  templateUrl: './change-password-popup.component.html',
  styleUrls: ['./change-password-popup.component.scss']
})
export class ChangePasswordComponentPopup implements OnInit {

  PageTitle = "Change Password"
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
  };
  submitAttempt = false;
  showLoader = false;
  currentUserDetail: any;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.addForm = fb.group({
      old_password: [null, Validators.compose([Validators.required])],
      new_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
      confirm_password: [null, Validators.compose([Validators.required, Validators.minLength(6)])]
    })
  }

  ngOnInit() { }

  submitForm(): void {

    this.submitAttempt = true;
    if (this.addForm.valid) {
      this.showLoader = true;
      const formData = {
        oldPassword: this.addForm.value.old_password,
        newPassword: this.addForm.value.new_password,
      };
    }
  }
  ngOnDestroy(): void {

  }
}
