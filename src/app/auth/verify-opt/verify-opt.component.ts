import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-opt',
  templateUrl: './verify-opt.component.html',
  styleUrls: ['./verify-opt.component.scss']
})
export class VerifyOptComponent implements OnInit {
  otpForm: FormGroup;
  forgatAuth: any = null;

  constructor(
    private router: Router,
    private fBuilder: FormBuilder,
  ) {
    this.otpForm = this.fBuilder.group({
      otp: [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  ngOnInit() { }


  submitForm(): void {
    if (this.otpForm.valid) {
      if (Number(this.forgatAuth.data) == Number(this.otpForm.value['otp'])) {
        this.router.navigateByUrl('/reset-password')
      } else {

      }
    }
  }
}
