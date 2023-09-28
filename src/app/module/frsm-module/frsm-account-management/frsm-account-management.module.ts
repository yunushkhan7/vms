import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { FrsmAccountManagementComponent } from './frsm-account-management.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SetupService } from 'src/app/service/setup.service';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
const routes: Routes = [
  {
    path: '',
    component: FrsmAccountManagementComponent,
    data: { title: 'FrsmAccountManagement' },
  }
]

@NgModule({
  declarations: [
    FrsmAccountManagementComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ActionPopupModule
  ],
  providers: [
    SetupService
  ]
})
export class FrsmAccountManagementModule { }
