import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-host-company-management',
  templateUrl: './host-company-management.component.html',
  styleUrls: ['./host-company-management.component.scss'],
})
export class HostCompanyManagementComponent implements OnInit {
  showLoader = false;
  companyList: any =[];
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
  filter:any = []
  filters: any = [];
  searchFilter: any = {};
  searchText: any = null;
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
    private translateService: TranslateService,
    private form: FormBuilder,
  ) {
    this.searchFilterForm = this.form.group({
      companyName: [""]
    })
  }

  ngOnInit(): void {
    this.getCompanyManagements();
    this.filters = [];
  }

  getCompanyManagements(): void {
    // let res = this.searchFilter();
    const params: any = {
      page: this.currentPage,
      pageSize: this.currentPageLimit,
      searchFilter : { andFilters: this.filter},
      sortElement: {
        propertyName: 'CreatedDate',
        sortOrder: -1
      },
    };
    this.filter.push({
      "propertyName": "Type",
      "operator": 0,
      "value": "VMS",
      "dataType": "string",
      "caseSensitive": true
    })
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
    this.filter = []
    this._setupService.getCompanyManagements(params).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.companyList = response?.data;
          var totalpage = response['recordCount'] / params.pageSize;
          if(totalpage.toString().includes('.')){
            this.lastpage = Math.floor(response['recordCount'] / params.pageSize) + 1
          }else{
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
    this.getCompanyManagements();
  }

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getCompanyManagements();
  }

  onDelete(company: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...company, isDelete: true,deletedData:company?.companyName },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._setupService.deleteCompanyManagement(company?.id).subscribe(
          (res) => {
            if (res.status == 'Ok' && res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getCompanyManagements();
              this.dialog.open(ActionPopupComponent, {
                data: { ...res, isSuccess: true},
              });
            } else if(res.status == 'Error') {
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

  // searchFilter(){
  //   const formdata = this.searchFilterForm.value;
  //   let x = []
  //   if (formdata.companyName !== null) {
  //     x.push({
  //       propertyName: "companyName",
  //       value: formdata.companyName,
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
    if (this.searchFilterForm.value.companyName) {
      this.filters.push({
        propertyName: 'companyName',
        value: this.searchFilterForm.value?.companyName,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
      this.filters.push({
        "propertyName": "Type",
        "operator": 0,
        "value": "VMS",
        "dataType": "string",
        "caseSensitive": true
      })
    }

    this.searchFilter = { andFilters:this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getCompanyManagements();
  }

  clearForm(){
   window.location.reload();
  }
  setStep1(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  setStep(index: number) {
    this.step1 = index;
    this.panelOpenState1 = true;
  }
  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }
}
