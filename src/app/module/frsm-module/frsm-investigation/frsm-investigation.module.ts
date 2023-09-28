import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmInvestigationComponent } from './frsm-investigation.component';
import { Routes, RouterModule } from '@angular/router';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SetupService } from 'src/app/service/setup.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ActionPopupModule } from 'src/app/core/action-popup/action-popup.module';

const routes: Routes = [
  {
    path: '',
    component: FrsmInvestigationComponent,
    data: { title: 'FrsmInvestigationComponent' },
  }
]

@NgModule({
  declarations: [
    FrsmInvestigationComponent
  ],
  imports: [
    CommonModule,
    I18nModule,
    RouterModule.forChild(routes),
    MatExpansionModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    ActionPopupModule
  ],
  providers: [
    SetupService
  ]
})
export class FrsmInvestigationModule { }
