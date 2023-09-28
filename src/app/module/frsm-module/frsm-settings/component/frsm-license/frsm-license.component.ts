import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
@Component({
  selector: 'app-frsm-license',
  templateUrl: './frsm-license.component.html',
  styleUrls: ['./frsm-license.component.scss']
})
export class FrsmLicenseComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  frsmLicenseList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _frsmSettingsService: FrsmSettingsService,
  ) { }

  ngOnInit(): void {
    this.getFRSMLicenseList()
  }

  getFRSMLicenseList(): void {
    this._frsmSettingsService.getFRSMLicenseList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.frsmLicenseList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

}
