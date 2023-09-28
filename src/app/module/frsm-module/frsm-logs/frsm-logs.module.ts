import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmLogsComponent } from './frsm-logs.component';
import { Routes, RouterModule } from '@angular/router';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SetupService } from 'src/app/service/setup.service';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { LoaderModule } from 'src/app/core/loader/loader.module';
const routes: Routes = [
  {
    path: '',
    component: FrsmLogsComponent,
    data: { title: 'FrsmLogs' },
  }
]

@NgModule({
  declarations: [
    FrsmLogsComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ActionPopupModule,
    LoaderModule
  ],
  providers: [
    SetupService
  ]
})
export class FrsmLogsModule { }
