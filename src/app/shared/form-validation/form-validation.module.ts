import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSubmitDirective } from './directive/form-submit.directive';
import { ControlErrorsDirective } from './directive/control-errors.directive';
import { ControlErrorContainerDirective } from './directive/control-error-container.directive';
import { ControlErrorComponent } from './control-error/control-error.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule
  ],
  declarations: [
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective
  ],
  exports: [
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ControlErrorsDirective,
    FormSubmitDirective
  ],
  entryComponents: [
    ControlErrorComponent
  ]
})
export class FormValidationModule { }
