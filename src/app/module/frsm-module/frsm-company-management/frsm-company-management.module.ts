import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmCompanyManagementComponent } from './frsm-company-management.component';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { Routes, RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { SetupService } from 'src/app/service/setup.service';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialModule } from '../../../shared/material/material.module';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FrmsCompanyManagementAddComponent } from './frms-company-management-add/frms-company-management-add.component';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';


const routes: Routes = [
  {
    path: '',
    component: FrsmCompanyManagementComponent,
    data: { title: 'FrsmCompanyManagement' },
  },
  {
    path: "company/add",
    component: FrmsCompanyManagementAddComponent,
  },

  {
    path: "company/edit/:id",
    component: FrmsCompanyManagementAddComponent,
  },
]

@NgModule({
  declarations: [
    FrsmCompanyManagementComponent,
    FrmsCompanyManagementAddComponent,
  ],
  imports: [
    CommonModule,
    I18nModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    ActionPopupModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule,
    MaterialModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    PaginationModule,
    ReactiveFormsModule,
    SharedModule,
    FormValidationModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    RouterModule.forChild(routes),
    LoaderModule
  ],
  providers: [
  ]
})
export class FrsmCompanyManagementModule { }
