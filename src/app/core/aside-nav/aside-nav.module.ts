import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsideNavComponent } from './aside-nav.component';
import { AsideNavRoutingModule } from './aside-nav-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatIconModule } from '@angular/material/icon';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';

@NgModule({
  declarations: [AsideNavComponent],
  imports: [
    CommonModule,
    AsideNavRoutingModule,
    MaterialModule,
    MatIconModule,
    NgbModule,
    I18nModule
  ],
  exports: [
    AsideNavComponent
  ]
})
export class AsideNavModule { }
