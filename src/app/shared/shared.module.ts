import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective, FloatNumberDirective } from './directive/number.directive';
import { PricePipe, SafePipe, TitleCasingPipe } from './pipe/status.pipe';
import { RouterBackDirective, onlyCharactersDirective, onlyNumbersAndHyphenDirective } from './directive/router-back.directive';
import { InputRestrictionDirective } from './directive/inputrestriction.directive';
//import { ActionPopupModule } from '../core/action-popup/action-popup.module';

const components = [
  NumberDirective,
  FloatNumberDirective,
  PricePipe,
  SafePipe,
  RouterBackDirective,
  onlyCharactersDirective,
  onlyNumbersAndHyphenDirective,
  InputRestrictionDirective,
  TitleCasingPipe
]
@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components
})
export class SharedModule { }
