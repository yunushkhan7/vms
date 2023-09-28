import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { PaginationService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-building-management',
  templateUrl: './building-management.component.html',
  styleUrls: ['./building-management.component.scss']
})
export class BuildingManagementComponent implements OnInit {
  showLoader = false
  buildNameList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  searchFilterForm: FormGroup
  columnNumberPrefix: number = 0;
  recordCount: any;
  panelOpenState1: boolean = false;
  step1 = 0;

  panelOpenState: boolean = false;
  step = 0;
  filters: any = [];
  searchFilter: any = {};
  searchText: any = null;
  isShort: any = false;
  sortFieldName: any;
  lastpage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private _toastService: ToastServiceService,
    private form: FormBuilder,
    private translateService: TranslateService,
  ) {
    this.searchFilterForm = this.form.group({
      buildingName: [""]
    })
  }

  ngOnInit(): void {
    this.getbuildNameList();
    this.filters = [];
  }

  getbuildNameList(): void {
    // let res = this.searchFilter();
    const params: any = {
      page: this.currentPage,
      pageSize: this.currentPageLimit,
      sortElement: {
        propertyName: 'CreatedDate',
        sortOrder: -1
      },
    };

    // if (res.length) {
    //   params.searchFilter = { andFilters: res }
    // }
    if (this.searchText) {
      params.searchFilter = this.searchFilter;
    }
    if (this.sortFieldName) {
      params.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }
    this._setupService.getBuildingName(params).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
        this.columnNumberPrefix = (params.page - 1) * params.pageSize;
        this.buildNameList = response?.data;
        var totalpage = response['recordCount'] / params.pageSize;
        if(totalpage.toString().includes('.')){
          this.lastpage = Math.floor(response['recordCount'] / params.pageSize) + 1
        }else{
          this.lastpage = Math.round(response['recordCount'] / params.pageSize) 
        }
        this.recordCount = response['recordCount'],
          this.showPagination = true;
        this.pagination = this.paginationService.getPager(
          response['recordCount'],
          this.currentPage,
          this.currentPageLimit
        );
      } else {
      }
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }

  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getbuildNameList()
  }

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getbuildNameList();
  }

  onDelete(building: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...building, isDelete: true, deletedData: building?.buildingName },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._setupService.deleteBuilding(building?.id).subscribe(
          (res) => {
            if (res.status == 'Ok', res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getbuildNameList();
              this.dialog.open(ActionPopupComponent, {
                data: { ...res, isSuccess: true },
              });
            } else if (res.status == 'Error') {
              this._toastService.showMSG(res?.message)
            }
          },
          (err) => {
            // this.dialog.open(ActionPopupComponent, {
            //   data: { ...err.error, isSuccess: true },
            // });
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
      }
    });
  }

  // searchFilter() {
  //   const formdata = this.searchFilterForm.value;
  //   let x = []
  //   if (formdata.buildingName !== null) {
  //     x.push({
  //       propertyName: "buildingName",
  //       value: formdata.buildingName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   return x;
  // }

  filterSearch(text){
    this.searchText = text;
    this.filters = [];
    if (this.searchFilterForm.value.buildingName) {
      this.filters.push({
        propertyName: 'buildingName',
        value: this.searchFilterForm.value?.buildingName,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
    }

    this.searchFilter = { andFilters:this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getbuildNameList();
  }

  clearForm(){
   window.location.reload();
  }

  setStep1(index: number) {
    this.step1 = index;
    this.panelOpenState1 = true;
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }
}
