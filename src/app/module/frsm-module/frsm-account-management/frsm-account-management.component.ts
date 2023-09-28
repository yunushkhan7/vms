import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';

@Component({
  selector: 'app-frsm-account-management',
  templateUrl: './frsm-account-management.component.html',
  styleUrls: ['./frsm-account-management.component.scss']
})
export class FrsmAccountManagementComponent implements OnInit {
  panelOpenState = false;
  showLoader = false;
  accounttList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.getAccounttList()
  }

  getAccounttList(): void {
    this._setupService.getAccounttList({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.accounttList=response?.data
      } else {
      }
    }, (error) => {
    //  this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }

}
