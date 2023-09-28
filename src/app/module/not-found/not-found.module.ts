import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageNotfoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nModule } from 'src/app/shared/i18n/i18n.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { LoaderModule } from 'src/app/core/loader/loader.module';


const routes: Routes = [
  {
    path: "",
    component: PageNotfoundComponent,
    data: { title: '404' }
  }
]

@NgModule({
  declarations: [PageNotfoundComponent],
  imports: [
    CommonModule,
    SharedModule,
    I18nModule,
    MaterialModule,
    LoaderModule,
    RouterModule.forChild(routes),
  ],
})
export class NotfoundModule { }
