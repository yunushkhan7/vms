import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReportComponent } from './report.component';
import { VisitorAccessLogComponent } from './component/visitor-access-log/visitor-access-log.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { VisitorAccessLogAddComponent } from './component/visitor-access-log-add/visitor-access-log-add.component';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: { title: 'Visitor Access Log' }
  },
  {
    path: 'addCheckInReport',
    component: VisitorAccessLogAddComponent,
  },
  {
    path: 'editCheckInReport/:id',
    component: VisitorAccessLogAddComponent,
  }
]

@NgModule({
  declarations: [
    ReportComponent,
    VisitorAccessLogComponent,
    VisitorAccessLogAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    I18nModule,
    PaginationModule,
    FormValidationModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    MatExpansionModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    ActionPopupModule,
    Ng2OrderModule,
    OwlDateTimeModule, OwlNativeDateTimeModule,
    LoaderModule
  ],
  providers:[DatePipe]
})
export class ReportModule { }
