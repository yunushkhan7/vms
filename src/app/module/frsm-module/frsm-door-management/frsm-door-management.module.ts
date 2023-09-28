import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmDoorManagementComponent } from './frsm-door-management.component';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { Routes, RouterModule } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MaterialModule } from '../../../shared/material/material.module';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { FrmsDoorManagementAddComponent } from './frms-door-management-add/frms-door-management-add.component';
import { LoaderModule } from 'src/app/core/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: FrsmDoorManagementComponent,
    data: { title: 'FrsmDoorManagement' },
  },
  {
    path: "door-management/add",
    component: FrmsDoorManagementAddComponent,
  },

  {
    path: "door-management/edit/:id",
    component: FrmsDoorManagementAddComponent,
  },
]


@NgModule({
  declarations: [
    FrsmDoorManagementComponent,
    FrmsDoorManagementAddComponent
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
    MaterialModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    PaginationModule,
    SharedModule,
    FormValidationModule,
    RouterModule.forChild(routes),
    LoaderModule
  ],
  providers: []
})
export class FrsmDoorManagementModule { }
