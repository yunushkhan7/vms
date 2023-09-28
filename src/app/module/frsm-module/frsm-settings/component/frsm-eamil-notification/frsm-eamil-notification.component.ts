import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
@Component({
  selector: 'app-frsm-eamil-notification',
  templateUrl: './frsm-eamil-notification.component.html',
  styleUrls: ['./frsm-eamil-notification.component.scss']
})
export class FrsmEamilNotificationComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  frsmEmailNotificationList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _frsmSettingsService: FrsmSettingsService,
  ) { }

  ngOnInit(): void {
    this.getFRSMEmailNotificationList()
  }

  getFRSMEmailNotificationList(): void {
    this._frsmSettingsService.getFRSMEmailNotificationList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.frsmEmailNotificationList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

}
