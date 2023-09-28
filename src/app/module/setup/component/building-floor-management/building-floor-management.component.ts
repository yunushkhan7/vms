import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/service/pagination.service';
import { SetupService } from 'src/app/service/setup.service';
import { environment } from 'src/environments/environment';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastServiceService } from 'src/app/service/toast-service.service';
@Component({
  selector: 'app-building-floor-management',
  templateUrl: './building-floor-management.component.html',
  styleUrls: ['./building-floor-management.component.scss'],
})
export class BuildingFloorManagementComponent implements OnInit {
  showLoader = false;
  FloorManagementList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  searchFilterForm: FormGroup;
  columnNumberPrefix: number;
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
    private paginationService: PaginationService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private _setupService: SetupService,
    private form: FormBuilder,
    private _toastService: ToastServiceService
  ) {
    this.searchFilterForm = this.form.group({
      floorName: [""],
      buildingName:[""]
    })
  }

  ngOnInit(): void {
    this.getFloorManagementList();
    this.filters = [];
  }

  getFloorManagementList(): void {
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
    this._setupService.FloorManagements(params).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.columnNumberPrefix = (params.page - 1) * params.pageSize;
          this.recordCount = response['recordCount'],
            this.FloorManagementList = response?.data;
            var totalpage = response['recordCount'] / params.pageSize;
            if(totalpage.toString().includes('.')){
              this.lastpage = Math.floor(response['recordCount'] / params.pageSize) + 1
            }else{
              this.lastpage = Math.round(response['recordCount'] / params.pageSize) 
            }
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
        this.toastr.error(error.error.message);
        this.showLoader = false;
      }
    );
  }
  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getFloorManagementList();
  }

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getFloorManagementList();
  }

  onDelete(floor: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...floor, isDelete: true },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._setupService.deleteFloorManagement(floor?.id).subscribe(
          (res) => {
            if (res.status == 'Ok', res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getFloorManagementList();
              this.dialog.open(ActionPopupComponent, {
                data: { ...res, isSuccess: true },
              });
            } else {
              if(res.status == 'Error'){
                this._toastService.showMSG(res?.message)
              }
              // this.dialog.open(ActionPopupComponent, {
              //   data: { ...res, isSuccess: false },
              // });
            }
          },
          (err) => {
            this.dialog.open(ActionPopupComponent, {
              data: { ...err.error, isSuccess: true },
            });
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
    if (this.searchFilterForm.value.floorName) {
      this.filters.push({
        propertyName: 'FloorName',
        value: this.searchFilterForm.value?.floorName,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
    }
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
    this.getFloorManagementList();
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
