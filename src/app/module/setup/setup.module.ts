import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SetupComponent } from './setup.component';
import { BuildingManagementComponent } from './component/building-management/building-management.component';
import { BuildingFloorManagementComponent } from './component/building-floor-management/building-floor-management.component';
import { HostCompanyManagementComponent } from './component/host-company-management/host-company-management.component';
import { KioskManagementComponent } from './component/kiosk-management/kiosk-management.component';
import { SellDeclarationManagementComponent } from './component/sell-declaration-management/sell-declaration-management.component';
import { AccountComponent } from './component/account/account.component';
import { LicenseKeysComponent } from './component/license-keys/license-keys.component';
import { FrsManagerSettingsComponent } from './component/frs-manager-settings/frs-manager-settings.component';
import { EmailSettingComponent } from './component/email-setting/email-setting.component';
import { VisitPurposesComponent } from './component/visit-purposes/visit-purposes.component';
import { OthersComponent } from './component/others/others.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialModule } from '../../shared/material/material.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { BuildingFloorManagementAddComponent } from './component/building-floor-management-add/building-floor-management-add.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { BuildingAddComponent } from './component/building-add/building-add.component';
import { HostCompanyAddComponent } from './component/host-company-add/host-company-add.component';
import { KioskAddComponent } from './component/kiosk-add/kiosk-add.component';
import { AccountAddComponent } from './component/account-add/account-add.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path: "",
    component: BuildingManagementComponent,
  },
  // building
  {
    path: "building",
    component: BuildingManagementComponent,
    data: { title: 'Building Management' }
  },
  {
    path: "building/add",
    component:BuildingAddComponent,
  },
  {
    path: "building/edit/:id",
    component:BuildingAddComponent,
  },
  // floor
  {
    path: "floor",
    component: BuildingFloorManagementComponent,
    data: { title: 'Floor Management' }
  },
  {
    path: "floor/add",
    component: BuildingFloorManagementAddComponent,
  },
  {
    path: "floor/edit/:id",
    component: BuildingFloorManagementAddComponent,
  },


  // host-company
  {
    path: 'host-company',
    component: HostCompanyManagementComponent,
    data: { title: 'Company Management' }
  },

  {
    path: "host-company/add",
    component: HostCompanyAddComponent,
  },

  {
    path: "host-company/edit/:id",
    component: HostCompanyAddComponent,
  },

  // kiosk
  {
    path: 'kiosk',
    component: KioskManagementComponent,
    data: { title: 'Kiosk Management' }
  },
  {
    path: "kiosk/addKiosk",
    component: KioskAddComponent,
  },
  {
    path: "kiosk/editKiosk/:id",
    component: KioskAddComponent,
  },



  {
    path: 'Self-declaration',
    component: SellDeclarationManagementComponent,
    data: { title: 'Self Declaration Management' }
  },

  // account
  {
    path: "account",
    component: AccountComponent,
    data: { title: 'Account' }
  },
  {
    path: 'account/addAccount',
    component: AccountAddComponent,
  },
  {
    path: 'account/editAccount/:id',
    component: AccountAddComponent,
  },

  {
    path: 'license-keys',
    component: LicenseKeysComponent,
  },
  {
    path: 'frsManager-settings',
    component: FrsManagerSettingsComponent,
  },
  {
    path: 'email-setting',
    component: EmailSettingComponent,
  },
  {
    path: 'visit-purposes',
    component: VisitPurposesComponent,
  },

  {
    path: 'other',
    component: OthersComponent,
    data: { title: 'Others Management' }
  }
]

@NgModule({
  declarations: [
    SetupComponent,
    BuildingManagementComponent,
    BuildingFloorManagementComponent,
    HostCompanyManagementComponent,
    KioskManagementComponent,
    SellDeclarationManagementComponent,
    AccountComponent,
    LicenseKeysComponent,
    FrsManagerSettingsComponent,
    EmailSettingComponent,
    VisitPurposesComponent,
    OthersComponent,
    BuildingFloorManagementAddComponent,
    BuildingAddComponent,
    HostCompanyAddComponent,
    KioskAddComponent,
    AccountAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatRadioModule,
    MaterialModule,
    I18nModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    SharedModule,
    FormValidationModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    MatSnackBarModule,
    ActionPopupModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
    LoaderModule,
    NgxIntlTelInputModule
  ],
  providers:[DatePipe],
  exports: [RouterModule]
})
export class SetupModule { }
