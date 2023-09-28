import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { VerifyOptComponent } from './verify-opt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: VerifyOptComponent,
    data: { title: 'verify-opt' }
  }
];

@NgModule({
  declarations: [
    VerifyOptComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class VerifyOptModule { }
