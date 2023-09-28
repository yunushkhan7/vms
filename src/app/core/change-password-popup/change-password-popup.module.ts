import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ChangePasswordComponentPopup } from './change-password-popup.component';


@NgModule({
  declarations: [ChangePasswordComponentPopup],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ], providers: [],
  exports: [ChangePasswordComponentPopup]
})
export class ChangePasswordModule { }
