import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {


  message: string = 'Snack Bar opened.';
  actionButtonLabel: string;
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 4000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addExtraClass: boolean = false;
  constructor(
    private _snackBar: MatSnackBar
  ) { }


  showMSG(message){
    // this._snackBar.open('hii', 'ok');
     let config = new MatSnackBarConfig();
     config.verticalPosition = this.verticalPosition;
     config.horizontalPosition = this.horizontalPosition;
     config.duration = this.setAutoHide ? this.autoHide : 0;
     config['extraClasses'] = this.addExtraClass ? ['test'] : undefined;
     this._snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
   }
}
