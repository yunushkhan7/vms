import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionPopupComponent } from './action-popup.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';

@NgModule({
  declarations: [
    ActionPopupComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    NgbModule,
    I18nModule,
    FormsModule
  ]
})
export class ActionPopupModule { }
