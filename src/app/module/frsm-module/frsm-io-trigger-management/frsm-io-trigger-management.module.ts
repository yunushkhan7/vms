import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmIoTriggerManagementComponent } from './frsm-io-trigger-management.component';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { Routes, RouterModule } from '@angular/router';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FrsmIoTriggerMangAddComponent } from './component/frsm-io-trigger-mang-add/frsm-io-trigger-mang-add.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { LoaderModule } from 'src/app/core/loader/loader.module';


export const routes: Routes = [
  {
    path: '',
    component: FrsmIoTriggerManagementComponent,
    data: { title: 'FrsmIoTriggerManagement' },
  },
  {
    path: 'add',
    component: FrsmIoTriggerMangAddComponent,
  },
  {
    path: 'edit/:id',
    component: FrsmIoTriggerMangAddComponent,
  },
]

@NgModule({
  declarations: [
    FrsmIoTriggerManagementComponent,
    FrsmIoTriggerMangAddComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    MatIconModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    PaginationModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatRadioModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatInputModule,
    SharedModule,
    ActionPopupModule,
    LoaderModule
  ],
  providers: []
})
export class FrsmIoTriggerManagementModule { }
