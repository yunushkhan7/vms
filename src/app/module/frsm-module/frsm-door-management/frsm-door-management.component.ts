import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/service/pagination.service';
import { SetupService } from 'src/app/service/setup.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-frsm-door-management',
  templateUrl: './frsm-door-management.component.html',
  styleUrls: ['./frsm-door-management.component.scss']
})
export class FrsmDoorManagementComponent implements OnInit {

  showLoader=false
  doorManagementList: any =[];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  columnNumberPrefix: number = 0;
  recordCount: any;
  panelOpenState1: boolean = false;
  step1 = 0;
  panelOpenState: boolean = false;
  step = 0;
  isShort: any = false;
  sortFieldName: any;
  lastpage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.getFRSMDoorManagementList()
  }



  getFRSMDoorManagementList(): void {
    // let res = this.searchFilter();
    const params: any = {
      page: this.currentPage,
      pageSize: this.currentPageLimit,
      sortElement: {
        propertyName: 'CreatedDate',
        sortOrder: -1,
      },
    };

    // if (res.length) {
    //   params.searchFilter = { andFilters: res }
    // }
    if (this.sortFieldName) {
      params.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }

    this._setupService.getDoorsManagements(params).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.doorManagementList = response?.data;
          var totalpage = response['recordCount'] / params.pageSize;
          if(totalpage.toString().includes('.')){
            this.lastpage = Math.floor(response['recordCount'] / params.pageSize) + 1
          }else {
            this.lastpage = Math.round(response['recordCount'] / params.pageSize) 
          }
          this.columnNumberPrefix = (params.page - 1) * params.pageSize;
          this.recordCount = response['recordCount'],
          this.showPagination = true;
          this.pagination = this.paginationService.getPager(
            response['recordCount'],
            this.currentPage,
            this.currentPageLimit
          );
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getFRSMDoorManagementList();
  }
  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getFRSMDoorManagementList();
  }

}
