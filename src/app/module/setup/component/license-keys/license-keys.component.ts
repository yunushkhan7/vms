import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';


@Component({
  selector: 'app-license-keys',
  templateUrl: './license-keys.component.html',
  styleUrls: ['./license-keys.component.scss']
})
export class LicenseKeysComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  licenseKeysList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.getLiscenseKeyList()
  }

  getLiscenseKeyList(): void {
    this._setupService.getLiscenseKeyList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.licenseKeysList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }
}
