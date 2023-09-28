import { Component, OnInit,ViewChild ,ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SetupService } from 'src/app/service/setup.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { PaginationService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import * as xlsx from 'xlsx'
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-kiosk-management',
  templateUrl: './kiosk-management.component.html',
  styleUrls: ['./kiosk-management.component.scss'],
})
export class KioskManagementComponent implements OnInit {
  // @ViewChild('epltable', { static: false }) epltable: ElementRef;
  showLoader = false;
  kisokList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  searchFilterForm: FormGroup;
  dropdownList: any = [
    {
      name: 'Yes',
      value: true
    },
    {
      name: 'No',
      value: false
    }
  ]
  declarationsData: any;
  show: boolean = false;
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
  permissionObject: any = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _setupService: SetupService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private form: FormBuilder,
    private translateService: TranslateService,
    private fb: FormBuilder,
    private _toastService: ToastServiceService,
    private dataService: DataService
  ) {

    this.searchFilterForm = this.form.group({
      kioskName: [""],
      buildingName: [""],
      securityCode: [""],
      visitorReg: [""],
      declarations: [""],
    })
    this.dataService.permission.subscribe((response) => {
      this.permissionObject = response?.permissions;
    });
  }

  ngOnInit(): void {
    this.getGetAllkisoksList();
    this.filters = [];
  }

  getGetAllkisoksList(): void {
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
    this._setupService.getGetAllkisoksList(params).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.kisokList = response?.data;
          this.columnNumberPrefix = (params.page - 1) * params.pageSize;
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
      },
      (error) => {
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
        this.showLoader = false;
      }
    );
  }


  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getGetAllkisoksList();
  }

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getGetAllkisoksList();
  }

  onDelete(kisok: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...kisok, isDelete: true, deletedData: kisok?.kisokName },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._setupService.deleteKiosk(kisok?.id).subscribe(
          (res) => {
            if (res?.status == 'Ok' && res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getGetAllkisoksList();
              this.dialog.open(ActionPopupComponent, {
                data: { ...res, isSuccess: true },
              });
            } else if (res.status == 'Error') {
              this._toastService.showMSG(res.message)
            }
          },
          (err) => {
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
      }
    });
  }

  // searchFilter() {
  //   const formdata = this.searchFilterForm.value;
  //   let x = []
  //   if (formdata.kioskName !== null) {
  //     x.push({
  //       propertyName: "kisokName",
  //       value: formdata.kioskName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.floorName !== null) {
  //     x.push({
  //       propertyName: "floorName",
  //       value: formdata.floorName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.securityCode !== null) {
  //     x.push({
  //       propertyName: "heightendMode",
  //       value: formdata.securityCode,
  //       dataType: "Boolean",
  //       caseSensitive: true,
  //       operator: 0
  //     })
  //   }
  //   if (formdata.visitorReg !== null) {
  //     x.push({
  //       propertyName: "allowVisitorRegistrations",
  //       value: formdata.visitorReg,
  //       dataType: "Boolean",
  //       caseSensitive: true,
  //       operator: 0
  //     })
  //   }

  //   return x;
  // }

  add() {
    // this.show=!this.show
    this.show = true
  }


  filterSearch(text){
    this.searchText = text;
    this.filters = [];
    if (this.searchFilterForm.value.kioskName) {
      this.filters.push({
        propertyName: 'kisokName',
        value: this.searchFilterForm.value?.kioskName,
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
    if (this.searchFilterForm.value.securityCode) {
      let securityCodeValue = this.searchFilterForm.value?.securityCode
      this.filters.push({
        propertyName: 'heightendMode',
        value: securityCodeValue == 'true' ? true : false,
        dataType: 'Boolean',
        operator: 0,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.visitorReg) {
      let visitorRegValue = this.searchFilterForm.value?.visitorReg
      this.filters.push({
        propertyName: 'allowVisitorRegistrations',
        value: visitorRegValue == 'true' ? true : false,
        dataType: 'Boolean',
        operator: 0,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.declarations) {
      let declareValue = this.searchFilterForm.value?.declarations
      this.filters.push({
        propertyName: 'selfDeclaration',
        value: declareValue == 'true' ? true : false,
        dataType: 'Boolean',
        operator: 0,
        caseSensitive: true,
      });
    }
    this.searchFilter = { andFilters:this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getGetAllkisoksList();
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

  EnableVisitorRegistrations() {
    this._setupService.EnableDisableVisitorRegistrations(true).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Enabled VisitorRegistrations");
      this.getGetAllkisoksList();
    })
  }
  DisableVisitorRegistrations() {
    this._setupService.EnableDisableVisitorRegistrations(false).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Disable VisitorRegistrations")
      this.getGetAllkisoksList();
    })
  }
  EnableHeightendMode() {
    this._setupService.EnableDisableHeightendMode(true).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Enable HeightendMode")
      this.getGetAllkisoksList();
    })
  }
  DisableHeightendMode() {
    this._setupService.EnableDisableHeightendMode(false).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Disable HeightendMode")
      this.getGetAllkisoksList();
    })
  }
  EnableselfDeclaration() {
    this._setupService.EnableDisableselfDeclaration(true).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Enabled selfDeclaration")
      this.getGetAllkisoksList();
    })
  }
  DisableselfDeclaration() {
    this._setupService.EnableDisableselfDeclaration(false).subscribe((data: any) => {
      this._toastService.showMSG("Successfully Disable selfDeclaration")
      this.getGetAllkisoksList();
    })
  }

  // exportToExcel() {
  //   const ws: xlsx.WorkSheet =
  //     xlsx.utils.table_to_sheet(this.epltable?.nativeElement);
  //   const wb: xlsx.WorkBook = xlsx.utils.book_new();
  //   xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
  //   xlsx.writeFile(wb, 'epltable.xlsx');
  // }

  DownloadExcel() {
    const excelData: any = {
      "isDownload": true
    };
    if (this.searchText) {
      excelData['searchFilter'] = this.searchFilter = { andFilters: this.filters };
    }
    if (this.sortFieldName) {
      excelData.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }
    this._setupService.getGetAllkisoksList(excelData).subscribe((res: any) => {
      if (res?.status == 'Ok') {
        window.location.href = res?.data;
      }
    })
  }

  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }
}
