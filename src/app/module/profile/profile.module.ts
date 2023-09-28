import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MaterialModule } from '../../shared/material/material.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoaderModule } from 'src/app/core/loader/loader.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
// import {NgxMatIntlTelInputComponent} from 'ngx-mat-intl-tel-input';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    data: { title: 'Profile' }
  }
]

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FormValidationModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    LoaderModule,
    I18nModule,
    NgxIntlTelInputModule
  ],
   providers: [
    AuthService
  ]
})
export class ProfileModule { }
