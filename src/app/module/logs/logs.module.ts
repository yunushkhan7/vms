import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsComponent } from './logs.component';
import { Routes, RouterModule } from '@angular/router';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
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
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { LogsAddComponent } from './component/logs-add/logs-add.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';



const routes: Routes = [
  {
    path: '',
    component: LogsComponent,
    data: { title: 'Logs' },
  },
  {
    path: 'addAccessLog',
    component: LogsAddComponent,
  },
  {
    path: 'editAccessLog/:id',
    component: LogsAddComponent,
  }

]

@NgModule({
  declarations: [
    LogsComponent,
    LogsAddComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule.forChild(routes),
    MaterialModule,
    MatExpansionModule,
    FormValidationModule,
    PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatPaginatorModule,
    MatIconModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    ActionPopupModule,
    LoaderModule

  ],
  providers: [
  ]
})
export class LogsModule { }
