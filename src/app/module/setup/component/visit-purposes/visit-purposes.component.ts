import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';

@Component({
  selector: 'app-visit-purposes',
  templateUrl: './visit-purposes.component.html',
  styleUrls: ['./visit-purposes.component.scss']
})
export class VisitPurposesComponent implements OnInit {
  panelOpenState = false;
 showLoader = false;
 visitPurposesList:any
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
  ) { }

  ngOnInit(): void {
    this.visitPurposes()
  }

  visitPurposes(): void {
    this._setupService.getvisitPurposes({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this. visitPurposesList=response?.data
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

}
