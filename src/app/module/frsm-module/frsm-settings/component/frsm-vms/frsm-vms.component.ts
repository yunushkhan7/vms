import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
@Component({
  selector: 'app-frsm-vms',
  templateUrl: './frsm-vms.component.html',
  styleUrls: ['./frsm-vms.component.scss']
})
export class FrsmVmsComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  frsmVMSList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _frsmSettingsService: FrsmSettingsService,
  ) { }

  ngOnInit(): void {
    this.getFrsmVMSList()
  }

  getFrsmVMSList(): void {
    this._frsmSettingsService.getFrsmVMSList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.frsmVMSList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

}
