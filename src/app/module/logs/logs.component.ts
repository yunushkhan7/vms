import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
import { MatDialog } from '@angular/material/dialog';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { PaginationService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { TranslateService } from '@ngx-translate/core';
import * as xlsx from 'xlsx';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getWeekDay } from 'src/app/shared/common';
import { CommonService } from 'src/app/service/common.service';

interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  showLoader = false;
  logsList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  columnNumberPrefix: number = 0;
  recordCount: any;
  searchFilterForm: FormGroup;
  FilterForm: FormGroup;
  date = new Date();
  y = this.date.getFullYear();
  m = this.date.getMonth();
  firstDayDate = new Date(this.y, this.m, 1);
  lastDayDate = new Date(this.y, this.m + 1, 0);
  firstWeekDay: any = getWeekDay(this.firstDayDate);
  lastWeekDay: any = getWeekDay(this.lastDayDate);

  panelOpenState2: boolean = false;
  step2 = 0;

  panelOpenState1: boolean = false;
  step1 = 0;

  panelOpenState: boolean = false;
  step = 0;
  isShort: any = false;
  sortFieldName: any;
  filters: any = [];
  searchFilter: any = {};
  searchText: any = null;
  lastpage: any;
  minDate: Date;
  maxDate= new Date();
  eventTypeList:any;
  public currentDate: Date = new Date();
  public lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private translateService: TranslateService,
    public form: FormBuilder,
    private commonService:CommonService
  ) {
    this.FilterForm = this.form.group({
      internaldate: [""]
    })
    this.searchFilterForm = this.form.group({
      startDate: [""],
      endDate: [""],
      eventType: [""],
      owner:[""]
    })
  }

  ngOnInit(): void {
    this.getVisitorAccessLogs();
    this.getFloorManagementList();
    this.filters = [];
  }

  getVisitorAccessLogs(): void {
    // let res = this.submitForm();
    const payLoad: any = {
      page: this.currentPage,
      pageSize: this.currentPageLimit,
      sortElement: {
        propertyName: 'EventTime',
        sortOrder: -1,
      },
    };
    // if (this.searchFilterForm.valid && res.length) {
    //   payLoad['searchFilter'] = {
    //     andFilters: res
    //   }
    // }
    if (this.searchText) {
      payLoad.searchFilter = this.searchFilter;
    }
    if (this.sortFieldName) {
      payLoad.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }
    this._setupService.getVisitorAccessLogs(payLoad).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
        this.logsList = response?.data;
        this.columnNumberPrefix = (payLoad.page - 1) * payLoad.pageSize;
        var totalpage = response['recordCount'] / payLoad.pageSize;
        if(totalpage.toString().includes('.')){
          this.lastpage = Math.floor(response['recordCount'] / payLoad.pageSize) + 1
        }else{
          this.lastpage = Math.round(response['recordCount'] / payLoad.pageSize) 
        }
        this.recordCount = response['recordCount'],
          this.pagination = this.paginationService.getPager(
            response['recordCount'],
            this.currentPage,
            this.currentPageLimit
          );
      } else {
      }
    }, (error) => {
      this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
      this.showLoader = false;
    });
  }

  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getVisitorAccessLogs()
  }
  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getVisitorAccessLogs();
  }

  onDelete(visitorAccessLog: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...visitorAccessLog, isDelete: true, deletedData: visitorAccessLog?.eventType },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._setupService.deleteVisitorAccessLog(visitorAccessLog?.id).subscribe(
          (res) => {
            if (res?.status == 'Ok' && res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getVisitorAccessLogs();
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

  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable?.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  // submitForm() {
  //   const formdata = this.searchFilterForm.value;
  //   let x = [];
  //   if (formdata.startDate !== null) {
  //     x.push({
  //       propertyName: "EventTime",
  //       value: this.ConvertIsoFormat(formdata.startDate),
  //       dataType: "DateTime",
  //       caseSensitive: true,
  //       operator: 3
  //     })
  //   }
  //   if (formdata.endDate !== null) {
  //     x.push({
  //       propertyName: "EventTime",
  //       value: this.ConvertIsoFormat(formdata.endDate),
  //       dataType: "DateTime",
  //       caseSensitive: true,
  //       operator: 4
  //     })
  //   }
  //   if (formdata.eventType !== null) {
  //     x.push({
  //       propertyName: "eventType",
  //       value: formdata.eventType,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.owner !== null) {
  //     x.push({
  //       propertyName: "owner",
  //       value: formdata.owner,
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
    if (this.searchFilterForm.value.startDate) {
      this.filters.push({
        propertyName: 'EventTime',
        value: this.commonService?.DateFormatter?.formatDate(this.searchFilterForm.value.startDate,'YYYY-MM-DD HH:mm'),
        dataType: 'DateTime',
        operator: 3,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.endDate) {
      this.filters.push({
        propertyName: 'EventTime',
        value: this.commonService?.DateFormatter?.formatDate(this.searchFilterForm.value.endDate,'YYYY-MM-DD HH:mm'),
        dataType: 'DateTime',
        operator: 4,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.eventType) {
      this.filters.push({
        propertyName: 'eventType',
        value: this.searchFilterForm.value.eventType,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.owner) {
      this.filters.push({
        propertyName: 'owner',
        value: this.searchFilterForm.value.owner,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.FilterForm.value.internaldate) {
      this.filters.push({
        propertyName: 'EventTime',
        value: this.commonService?.DateFormatter?.formatDate(this.FilterForm.value.internaldate,'YYYY-MM-DD HH:mm'),
        dataType: 'DateTime',
        operator: 3,
        caseSensitive: true,
      });
    }

    this.searchFilter = { andFilters:this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getVisitorAccessLogs();
  }
  

  clearForm(){
    window.location.reload();
   }

  ConvertIsoFormat(data: any) {
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    var startDate = (startdate < 10) ? '0' + JSON.stringify(startdate) : JSON.stringify(startdate);
    var startMonth = (startmonth < 10) ? '0' + JSON.stringify(startmonth) : JSON.stringify(startmonth);
    const StartDateTime = startyear + '-' + startMonth + '-' + startDate + 'T' + "00:00:00Z"
    return StartDateTime;
  }

  setStep2(index: number) {
    this.step2 = index;
    this.panelOpenState2 = true;
  }

  setStep1(index: number) {
    this.step1 = index;
    this.panelOpenState1 = true;
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  DownloadExcel() {
    let excelData = {
      "isDownload": true
    };
    if (this.searchText) {
      excelData['searchFilter'] = this.searchFilter = { andFilters: this.filters };
    }
    this._setupService.getVisitorAccessLogs(excelData).subscribe((res: any) => {
      if (res?.status == 'Ok') {
        window.location.href = res?.data;
      }
    })
  }

  eDateChangedStart(res: any) {
    this.minDate = res.value;
  }
  eDateChangedStart2(res: any) {
    this.minDate = res.value;
  }

  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }

  getFloorManagementList(): void {
    this._setupService.getEventTypeList({}).subscribe(
      (response) => {
        this.showLoader = false;
        this.eventTypeList = response?.data;
      },
      (error) => {
      }
    );
  }

  space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault();
    }
   }
}
