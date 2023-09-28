import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlackListComponent } from './black-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { SetupService } from 'src/app/service/setup.service';
import { BlackListAddComponent } from './component/black-list-add/black-list-add.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatRadioModule} from '@angular/material/radio';
import { MaterialModule } from '../../shared/material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/core/pagination/pagination.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { FormValidationModule } from 'src/app/shared/form-validation/form-validation.module';
import { AuthService } from 'src/app/service/auth.service';
import { InputRestrictionDirective } from 'src/app/shared/directive/inputrestriction.directive';
import { LoaderModule } from 'src/app/core/loader/loader.module';



const routes: Routes = [
  {
    path: '',
    component: BlackListComponent,
    data: { title: 'Black List' }
  },
  {
    path: 'addBlackList',
    component: BlackListAddComponent,
  },
  {
    path: 'edit/:id',
    component: BlackListAddComponent,
  }
]

@NgModule({
  declarations: [
    BlackListComponent,
    BlackListAddComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatButtonModule,
    I18nModule,
    MatSlideToggleModule,
    MatRadioModule,
    MaterialModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    SharedModule,
    FormValidationModule,
    LoaderModule
  ],
  providers: [
    AuthService
  ]
})
export class BlackListModule {

 }
