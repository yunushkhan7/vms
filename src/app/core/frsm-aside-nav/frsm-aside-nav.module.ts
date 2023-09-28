import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrsmAsideNavComponent } from './frsm-aside-nav.component';
import { FrsmAsideNavRoutingModule } from './frsm-aside-nav-routing-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    FrsmAsideNavComponent
  ],
  imports: [
    CommonModule,
    FrsmAsideNavRoutingModule,
    MaterialModule,
    MatIconModule,
    NgbModule
  ],
  exports: [
    FrsmAsideNavComponent
  ]
})
export class FrsmAsideNavModule { }
