import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';

@Component({
  selector: 'app-frsm-building-management',
  templateUrl: './frsm-building-management.component.html',
  styleUrls: ['./frsm-building-management.component.scss']
})
export class FrsmBuildingManagementComponent implements OnInit {
  panelOpenState = false;
  showLoader=false
  buildNameList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) {

   }

   ngOnInit(): void {
    this.getbuildNameList()
  }

  getbuildNameList(): void {
    this._setupService.getBuildingName({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.buildNameList=response?.data
      } else {
      }
    }, (error) => {
     // this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }

}
