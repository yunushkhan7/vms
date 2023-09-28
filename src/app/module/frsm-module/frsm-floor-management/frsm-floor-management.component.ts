import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';

@Component({
  selector: 'app-frsm-floor-management',
  templateUrl: './frsm-floor-management.component.html',
  styleUrls: ['./frsm-floor-management.component.scss']
})
export class FrsmFloorManagementComponent implements OnInit {
  panelOpenState = false;
  showLoader=false
  FloorManagementList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.getFloorManagementList()
  }

  getFloorManagementList(): void {
    this._setupService.FloorManagement({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.FloorManagementList=response?.data
      } else {
      }
    }, (error) => {
     // this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }
}
