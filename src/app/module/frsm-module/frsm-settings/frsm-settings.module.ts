import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmSettingsComponent } from './frsm-settings.component';
import { FrsmAcsServerComponent } from './component/frsm-acs-server/frsm-acs-server.component';
import { FrsmQrCodeRaderComponent } from './component/frsm-qr-code-rader/frsm-qr-code-rader.component';
import { FrsmIoBoxComponent } from './component/frsm-io-box/frsm-io-box.component';
import { FrsmSmtpComponent } from './component/frsm-smtp/frsm-smtp.component';
import { FrsmVmsComponent } from './component/frsm-vms/frsm-vms.component';
import { FrsmFrsComponent } from './component/frsm-frs/frsm-frs.component';
import { FrsmEamilNotificationComponent } from './component/frsm-eamil-notification/frsm-eamil-notification.component';
import { FrsmLicenseComponent } from './component/frsm-license/frsm-license.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FrsmQrCodeReaderAddComponent } from './component/frsm-qr-code-rader/component/frsm-qr-code-reader-add/frsm-qr-code-reader-add.component';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';
import { FrsmIoBoxAddComponent } from './component/frsm-io-box/componet/frsm-io-box-add/frsm-io-box-add.component';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';

const routes: Routes = [
  {
    path: '',
    component: FrsmAcsServerComponent,
  },
  {
    path: "acs-server",
    component: FrsmAcsServerComponent,
    data: { title: 'Frms AcsServer' }
  },
  {
    path: "smtp",
    component: FrsmSmtpComponent,
  },
  {
    path: 'vms',
    component: FrsmVmsComponent,
  },
  {
    path: 'frs',
    component: FrsmFrsComponent,
    data: { title: 'FrmsFrs' }
  },


  {
    path: 'email-notification',
    component: FrsmEamilNotificationComponent,
  },
  {
    path: 'license',
    component: FrsmLicenseComponent,
  },
  {
    path: 'qr-code-reader',
    component: FrsmQrCodeRaderComponent,
    data: { title: 'Frms QrCodeRader' }
  },
  {
    path: 'qr-code-reader/add',
    component: FrsmQrCodeReaderAddComponent,
  },
  {
    path: 'qr-code-reader/edit/:id',
    component: FrsmQrCodeReaderAddComponent,
  },
  {
    path: 'io-box',
    component: FrsmIoBoxComponent,
    data: { title: 'Frms IoBox' }
  },
  {
    path: 'io-box/add',
    component: FrsmIoBoxAddComponent,
  },
  {
    path: 'io-box/edit/:id',
    component: FrsmIoBoxAddComponent,
  }
]


@NgModule({
  declarations: [
    FrsmSettingsComponent,
    FrsmAcsServerComponent,
    FrsmSmtpComponent,
    FrsmVmsComponent,
    FrsmFrsComponent,
    FrsmEamilNotificationComponent,
    FrsmLicenseComponent,
    FrsmQrCodeRaderComponent,
    FrsmIoBoxComponent,
    FrsmQrCodeReaderAddComponent,
    FrsmIoBoxAddComponent,
    // InputRestrictionDirective
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
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    PaginationModule,
    ActionPopupModule,
    I18nModule,
    LoaderModule
  ],
  providers: []
})
export class FrsmSettingsModule { }
