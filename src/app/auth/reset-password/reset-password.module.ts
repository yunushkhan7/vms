import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ResetPasswordComponent } from './reset-password.component';


const routes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
    data: { title: 'reset-password' }
  }
];
@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    I18nModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    AuthService,DatePipe
  ]
})
export class ResetPasswordModule { }
