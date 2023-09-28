import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { AsideNavModule } from 'src/app/core/aside-nav/aside-nav.module';
import { FrsmAsideNavModule } from 'src/app/core/frsm-aside-nav/frsm-aside-nav.module';
import { MasterLayoutComponent } from '../core/layout/sidebar/master-layout.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
@NgModule({
  declarations: [MasterLayoutComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    AsideNavModule,
    FormsModule,
    MaterialModule,
    FrsmAsideNavModule,
    I18nModule
  ]
})
export class MasterModule { }
