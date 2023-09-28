import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
@Component({
  selector: 'app-frsm-logs',
  templateUrl: './frsm-logs.component.html',
  styleUrls: ['./frsm-logs.component.scss']
})
export class FrsmLogsComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  frsmLogsList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.getLogList()
  }

  getLogList(): void {
    this._setupService.getFRSMLogList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.frsmLogsList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

}
