import { Component, OnInit } from '@angular/core';
let COUNT = {
  availableCount: 0,
  totalCount: 0,
  utilizedCount: 0
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  permissionObject: any = null;
  currentUser: any;

  platinum: any = COUNT;
  gold: any = COUNT;
  standard: any = COUNT;
  licenseListArray: any = [];

  constructor(
  ) {
  }

  ngOnInit() {

  }
  
  ngOnDestroy() {

  }
}
