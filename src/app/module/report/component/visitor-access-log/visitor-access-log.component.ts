import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
} from '@angular/forms';
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
import { getWeekDay } from 'src/app/shared/common';
import { MatOption } from '@angular/material/core';
import { CommonService } from 'src/app/service/common.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSelect } from '@angular/material/select';
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-visitor-access-log',
  templateUrl: './visitor-access-log.component.html',
  styleUrls: ['./visitor-access-log.component.scss'],
})
export class VisitorAccessLogComponent implements OnInit {
  @ViewChild('epltable', { static: false }) epltable: ElementRef;
  visitorAccessList: any = [];
  showLoader = false;
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  kioskList: any = [];
  declarList: any = [];
  QUESArray: any = [];
  isLoader = false;
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];
  EventList: any = [
    { id: 1, name: 'Checkin Success' },
    { id: 2, name: 'CheckIn Failed Printer not connected or offline' },
  ];
  passCriteriaData: any = [
    {
      name: 'Yes',
      passCriteria: true,
    },
    {
      name: 'No',
      passCriteria: false,
    },
  ];
  searchFilterForm: FormGroup;
  columnNumberPrefix: number = 0;
  minDate=new Date();
  maxDate= new Date();
  declarationsData: any;
  isdeclarations = false;
  recordCount: any;
  date = new Date();
  y = this.date.getFullYear();
  m = this.date.getMonth();
  firstDayDate = new Date(this.y, this.m, 1);
  lastDayDate = new Date(this.y, this.m + 1, 1);
  firstWeekDay: any = getWeekDay(this.firstDayDate);
  lastWeekDay: any = getWeekDay(this.lastDayDate);
  panelOpenState1: boolean = false;
  step1 = 0;
  panelOpenState: boolean = false;
  step = 0;
  reverse: boolean = false;
  key: string = '';
  isShort: any = false;
  sortFieldName: any;
  filters: any = [];
  searchFilter: any = {};
  searchText: any = null;
  visitoreventTime: any = [];
  visitordatetime;
  lastpage: any;
  visitorimage: any;
  base64Image: any;
  imagevisitor: any;

  visitorimageid: any;
  base64Image2: any;
  imagevisitorid: any;

  minStartDateValue = this.setMinDate();
  eventTypeList: any = [];
  tablefilter:any=[];
  allSelected = false;
  submitted:boolean;
  @ViewChild('select') select: MatSelect;
  public currentDate: Date = new Date();
  public lastDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth()+1, 0);
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    public form: FormBuilder,
    private fb: FormBuilder,
    private translateService: TranslateService,
    private commonService: CommonService,
    private sanitizer: DomSanitizer
  ) {
    this.searchFilterForm = this.form.group({
      startDate: ['', Validators.compose([])],
      endDate: ['', Validators.compose([])],
      kioskName: [''],
      eventName: [''],
      visitorName: [''],
      phoneNo: [''],
      idNumber: [''],
      overriddenBy: [''],
      building: [''],
      declarations: new FormArray([]),
    });
  }

  get f() {
    return this.searchFilterForm.controls;
  }
  get t() {
    return this.f['declarations'] as FormArray;
  }

  ngOnInit(): void {
    this.getCheckInReport();
    this.getCheckInReportEventStatus();
    this.getKiosk();
    this.getKioskThickClien();
    this.filters = [];
    this.add();
  }
  
  eDateChangedStart(res: any) {
    this.minDate = res.value;
  }

  setMinDate() {
    let date = new Date();
    let year: any = date.getFullYear();
    let month: any = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    let day: any = date.getDate();
    day = day < 10 ? '0' + day : day;
    let d = `${year}-${month}-${day}`;
    return d;
  }
  getKiosk() {
    // this._setupService.getGetAllkisoksList({}).subscribe((response: any) => {
    //   this.kioskList = response?.data;
    // });

    this._setupService.getKisokName({}).subscribe((response: any) => {
      this.kioskList = response?.data;
    });

  }

  getCheckInReport(): void {
    // let res = this.submitForm();
    const params: any = {
      requestOptions: {
        page: this.currentPage,
        pageSize: this.currentPageLimit,
        sortElement: {
          propertyName: 'EventTime',
          sortOrder: -1,
        },
      },
    };

    // if (this.searchFilterForm.valid && res.length) {
    //   params.requestOptions['searchFilter'] = {
    //     andFilters: res,
    //   },
    //     params['questionary'] = (this.searchFilterForm?.value?.declarations)
    //       ? this.searchFilterForm?.value?.declarations : ''
    // }
    if (this.searchText) {
      params.requestOptions['searchFilter'] = this.searchFilter;
     if(this.searchFilterForm?.value?.declarations?.length>0){
      this.searchFilterForm?.value?.declarations?.forEach((item, i) => {
        if(item?.question == null){
          params['questionary'] = null
        }else {
          params['questionary'] = this.searchFilterForm?.value?.declarations;
        }
      });
     }

      // if(this.searchFilterForm?.value?.declarations != ''){
      //   params['questionary'] = (this.searchFilterForm?.value?.declarations)
      //   ? this.searchFilterForm?.value?.declarations : ''
      // }

    }

    if (this.sortFieldName) {
      params.requestOptions['sortElement'] = {
        propertyName: this.sortFieldName,
        sortOrder: this.isShort ? 1 : -1,
      };
    }
    this.isLoader = true;
    this._setupService.getCheckInReport(params).subscribe(
      (response) => {
        if (response?.data) {
          this.isLoader = false;
          this.columnNumberPrefix =
            (params.requestOptions.page - 1) * params.requestOptions.pageSize;
          this.visitorAccessList = response?.data;
          var totalpage = response['recordCount'] / params.requestOptions.pageSize;
          if (totalpage.toString().includes('.')) {
            this.lastpage =
              Math.floor(response['recordCount'] / params.requestOptions.pageSize) + 1;
          } else {
            this.lastpage = Math.round(
              response['recordCount'] /params.requestOptions.pageSize
            );
          }
          this.visitorAccessList.forEach((element, i) => {
            this.visitoreventTime = element?.eventTime;

            this.visitorimage = element?.visitorImage;
            this.visitorimageid = element?.idPhotoImage;
            if (this.visitorimageid == '') {
              this.visitorAccessList[i]['imagesid'] =
                'assets/images/DefaultUser.png';
            } else {
              this.visitorAccessList[i]['imagesid'] =environment.imageurllink + this.visitorimageid;
                
            }

            if (this.visitorimage == '') {
              this.visitorAccessList[i]['visitorimages'] =
                'assets/images/DefaultUser.png';
            } else {
              this.visitorAccessList[i]['visitorimages'] =environment.imageurllink+ this.visitorimage;
            }
          });
          (this.recordCount = response['recordCount']),
            (this.showPagination = true);
          this.pagination = this.paginationService.getPager(
            response['recordCount'],
            this.currentPage,
            this.currentPageLimit
          );
        } else {
          this.isLoader = false;
        }
      },
      (error) => {
        // this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
        this.isLoader = false;
      }
    );
  }

  mask(str) {
    const first = str?.substring(0, 10);
    const last = str?.substring(12, 22);
    const mask = first + ' ' + last;
    return mask;
  }

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getCheckInReport();
  }

  declareArray2;
  getKioskThickClien(): void {
    this.isLoader = true;
    this._setupService.getKioskThickClien({}).subscribe(
      (response) => {
        this.isLoader = false;
        if (response?.data) {
          this.declarationsData = response?.data?.questionary;
          this.declarationsData?.quotesArray?.forEach((item, i) => {
            this.declarationsData[i]['isSelected'] = false;
            this.declarationsData[i]['ownerName'] = null;
          });
        } else {
          this.isLoader = false;
        }
      },
      (error) => {
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
        this.isLoader = false;
      }
    );
  }

  selectSelfDeclare(declar) {
    this.declarationsData.forEach((e, i) => {
      // e.isExisted = true;
      if (e.question === declar.question) {
        this.declarationsData.splice(i, 1);
      }
    });
  }

  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    this.getCheckInReport();
  }

  onDelete(report: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...report, isDelete: true, deletedData: report?.visitorName },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this.isLoader = true;
        this._setupService.deleteCheckInReport(report?.id).subscribe(
          (res) => {
            if (res?.status == 'Ok' && res?.data) {
              this.isLoader = false;
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getCheckInReport();
              this.dialog.open(ActionPopupComponent, {
                data: { ...res, isSuccess: true },
              });
            } else if (res.status == 'Error') {
              this.isLoader = false;
              this._toastService.showMSG(res.message);
            }
          },
          (err) => {
            this._toastService.showMSG(
              this.translateService.instant('FRSM.ERROR')
            );
            this.isLoader = false;
          }
        );
      }
    });
  }

  checkProperties(obj) {
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != '') return false;
    }
    return true;
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
  //   if (formdata.kioskName !== null) {
  //     for (let i = 0; i < formdata.kioskName.length; i++) {
  //       x.push({
  //         propertyName: "KioskName",
  //         value: formdata.kioskName[i],
  //         dataType: "String",
  //         caseSensitive: true,
  //         operator: 5
  //       })
  //     }
  //   }
  //   if (formdata.eventName !== null) {
  //     x.push({
  //       propertyName: "Event",
  //       value: formdata.eventName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.visitorName !== null) {
  //     x.push({
  //       propertyName: "VisitorName",
  //       value: formdata.visitorName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.phoneNo !== null) {
  //     x.push({
  //       propertyName: "Phone",
  //       value: formdata.phoneNo,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.idNumber !== null) {
  //     x.push({
  //       propertyName: "IdNumber",
  //       value: formdata.idNumber,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.overriddenBy !== null) {
  //     x.push({
  //       propertyName: "OverriddenBy",
  //       value: formdata.overriddenBy,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.building !== null) {
  //     x.push({
  //       propertyName: "kioskBuilding",
  //       value: formdata.building,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.declarations !== null) {
  //     this.isdeclarations = true
  //     this.declarList.push({
  //       questionary: formdata.declarations,
  //     })
  //   }
  //   return x;
  // }

  filterSearch(text) {
    this.searchText = text;
    this.filters = [];
    // if(this.tablefilter.length !=0){
    //   this.tablefilter.forEach(element => {
    //     this.filters.push(element);
    //   });
    // }
    if (this.searchFilterForm.value.startDate) {
      this.filters.push({
        propertyName: 'EventTime',
        value: this.commonService?.DateFormatter?.formatDate(
          this.searchFilterForm.value.startDate,
          'YYYY-MM-DD HH:mm'
        ),
        dataType: 'DateTime',
        operator: 3,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.endDate) {
      this.filters.push({
        propertyName: 'EventTime',
        value: this.commonService?.DateFormatter?.formatDate(
          this.searchFilterForm.value.endDate,
          'YYYY-MM-DD HH:mm'
        ),
        dataType: 'DateTime',
        operator: 4,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.kioskName) {
      this.filters.push({
        propertyName: 'KioskName',
        value: this.searchFilterForm.value.kioskName,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
      // for (let i = 0; i < this.searchFilterForm.value.kioskName.length; i++) {
      //   this.filters.push({
      //     propertyName: 'KioskName',
      //     value: this.searchFilterForm.value.kioskName[i],
      //     dataType: 'String',
      //     caseSensitive: true,
      //     operator: 5,
      //   });
      // }
    }
    if (this.searchFilterForm.value.eventName) {
      this.filters.push({
        propertyName: 'Event',
        value: this.searchFilterForm.value.eventName,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.visitorName) {
      this.filters.push({
        propertyName: 'VisitorName',
        value: this.searchFilterForm.value.visitorName,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.phoneNo) {
      this.filters.push({
        propertyName: 'Phone',
        value: this.searchFilterForm.value.phoneNo,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.idNumber) {
      this.filters.push({
        propertyName: 'IdNumber',
        value: this.searchFilterForm.value.idNumber,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.overriddenBy) {
      this.filters.push({
        propertyName: 'OverriddenBy',
        value: this.searchFilterForm.value.overriddenBy,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.building) {
      this.filters.push({
        propertyName: 'kioskBuilding',
        value: this.searchFilterForm.value.building,
        dataType: 'String',
        operator: 5,
        caseSensitive: true,
      });
    }
    let checkdeclaration = false
    if(this.searchFilterForm?.value?.declarations?.length==1){
      this.searchFilterForm?.value?.declarations?.forEach((item, i) => {
        if(item?.question== null && item?.passCriteria == null){
          checkdeclaration = true;
          // item = null;
          
        }
        
        
      });
     }
    if (this.searchFilterForm.value.declarations != null && checkdeclaration == false) {
      this.isdeclarations = true;
      this.declarList.push({
        questionary: this.searchFilterForm.value.declarations,
      });

      this.searchFilterForm.value.declarations.forEach((element, i) => {
        if(element?.passCriteria==null){
          this._toastService.showMSG(this.translateService.instant('Please Select Answer'));
        }
        if(element?.question==null){
          this._toastService.showMSG(this.translateService.instant('Please Select Question'));
        }
      });

     
    }

    this.searchFilter = { andFilters: this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getCheckInReport();
  }

  clearForm() {
    window.location.reload();
  }
  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }


  ConvertIsoFormat(data: any) {
    let startdate = data.getDate();
    let startmonth = data.getMonth() + 1;
    const startyear = data.getFullYear();
    var startDate =
      startdate < 10
        ? '0' + JSON.stringify(startdate)
        : JSON.stringify(startdate);
    var startMonth =
      startmonth < 10
        ? '0' + JSON.stringify(startmonth)
        : JSON.stringify(startmonth);
    const StartDateTime =
      startyear + '-' + startMonth + '-' + startDate + 'T' + '00:00:00Z';
    return StartDateTime;
  }

  exportToExcel() {
    const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(
      this.epltable?.nativeElement
    );
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  add() {
    this.t.push(
      this.fb.group({
        question: [null],
        passCriteria: [null],
      })
    );
  }

  onSelect(declar, selectedIndex, outerIndex, item) {
    let prvQUES = '';
    if (this.QUESArray[outerIndex]) {
      prvQUES = this.QUESArray[outerIndex];
      const index = this.declarationsData.findIndex(
        (item) => item.question == prvQUES
      );
      this.declarationsData[index]['isSelected'] = false;
      this.declarationsData[selectedIndex]['isSelected'] = true;
      this.QUESArray[outerIndex] = declar?.question;
    } else {
      this.declarationsData[selectedIndex]['isSelected'] = true;
      this.QUESArray[outerIndex] = declar?.question;
    }
  }

  onBlackList(id) {
    this._setupService.VisitorBlacking(id, {}).subscribe(
      (res) => {
        if (res) {
          this.router.navigateByUrl('black-list');
          this._toastService.showMSG(res.message);
        } else if (res.status == 'Error') {
          this._toastService.showMSG(res.message);
        }
      },
      (err) => {
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
      }
    );
  }

  setStep1(index: number) {
    this.step1 = index;
    this.panelOpenState1 = true;
  }

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  sort(key) {
    // this.key = key;
    // this.reverse = !this.reverse;
    let y = [];
    let x = this.visitorAccessList;
    x.forEach((e, i) => {
      y[i] = this.visitorAccessList[x.length - (i + 1)];
    });
    this.visitorAccessList = y;
  }

  DownloadExcel() {
    const excelData = {
      requestOptions: {
        isDownload: true,
        sortElement: {
          propertyName: 'EventTime',
          sortOrder: -1
        }
      },
    };
    if (this.searchText) {
      excelData.requestOptions['searchFilter'] = this.searchFilter = { andFilters: this.filters };
      // excelData['questionary'] = (this.searchFilterForm?.value?.declarations)
      // ? this.searchFilterForm?.value?.declarations : ''
      if(this.searchFilterForm?.value?.declarations?.length>0){
        this.searchFilterForm?.value?.declarations?.forEach((item, i) => {
          if(item?.question == null){
            excelData['questionary'] = null
          }else {
            excelData['questionary'] = this.searchFilterForm?.value?.declarations;
          }
        });
       }
    }

    if (this.sortFieldName) {
      excelData.requestOptions['sortElement'] = {
        propertyName: this.sortFieldName,
        sortOrder: this.isShort ? 1 : -1,
      };
    }
    this._setupService.getCheckInReport(excelData).subscribe((res: any) => {
      if (res?.status == 'Ok') {
        window.location.href = res?.data;
      }
    });
  }

  getCheckInReportEventStatus(){
    this._setupService.getCheckInReportEventStatus().subscribe((response: any) => {
      this.eventTypeList = response?.data
    })
  }


  toggleAllSelection() {
    this.eventTypeList.forEach((item, indeex) => {
      let index = this.tablefilter.findIndex((c) => c.value == item);
      if (index !== -1) {
        this.tablefilter.splice(index, 1);
      }
    });

    if (this.allSelected) {
      this.select.options.forEach((item: MatOption) => item.select());

      this.eventTypeList.forEach((item, indeex) => {
        this.tablefilter.push({
          propertyName: 'Event',
          value: item,
          // dataType:
          //   item.typeName == 'VMS Contractors'
          //     ? 'VMS Contractors'
          //     : item.typeName == 'VMS Visitors'
          //     ? 'VMS Visitors'
          //     : 'Employee',
          dataType:"String",
          operator: 5,
          caseSensitive: true,
        });
      });
    } else {
      this.select.options.forEach((item: MatOption) => item.deselect());

      this.eventTypeList.forEach((item, indeex) => {
        let index = this.tablefilter.indexOf(item.typeName);

        this.tablefilter.splice(index, 1);
      });
    }
  }
  optionClick(selectedItem: any) {
    let newStatus = true;
    this.select.options.forEach((item: MatOption) => {
      if (!item.selected) {
        newStatus = false;
        let index = this.tablefilter.findIndex((c) => c.value == item);
        if (index !== -1) {
          this.tablefilter.splice(index, 1);
        }
      } else {
        //newStatus = true;
        if (selectedItem == item) {
          this.tablefilter.push({
            propertyName: 'Event',
            value: selectedItem,
            // dataType:
            //   selectedItem == 'VMS Contractors'
            //     ? 'VMS Contractors'
            //     : selectedItem == 'VMS Visitors'
            //     ? 'VMS Visitors'
            //     : 'Employee',
            dataType:"String",
            operator: 5,
            caseSensitive: true,
          });
        }
      }
    });
    this.allSelected = newStatus;
  }
}
