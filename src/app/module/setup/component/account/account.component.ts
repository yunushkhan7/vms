import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetupService } from 'src/app/service/setup.service';
import { PaginationService } from 'src/app/service/pagination.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showLoader = false;
  accounttList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  searchFilterForm: FormGroup
  columnNumberPrefix: number = 0;
  recordCount: any;
  currentUser: any
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
  startCounting=1
  sNo=[];
  lastpage: any;
  filter2:any = []
  userId:any;
  constructor(
    private authService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _setupService: SetupService,
    private paginationService: PaginationService,
    public dialog: MatDialog,
    private _userService: UserService,
    private _toastService: ToastServiceService,
    private form: FormBuilder,
    private translateService: TranslateService,
    private dataservice: DataService
  ) {
    this.searchFilterForm = this.form.group({
      userName: [""],
      role:[""],
      email:[""]
    })

  }

  ngOnInit(): void {
    this.dataservice.currentUser.subscribe((res => {
      if (res) {
        this.currentUser = res
        // this.userId = this.currentUser?.id
        this.getAccounttList();
      }
    }))
    this.filters = [];
  }

  getAccounttList(): void {
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
      "propertyName": "IsDeleted",
      "operator": 0,
      "value": "False",
      "dataType": "Boolean",
      "caseSensitive": true
    })
    let userId = this.currentUser?.id
    this.filter.push({
      "propertyName": "Id",
      "operator": 8,
      "value": userId?.toString(),
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
    // this.filter2 = []
    this.authService.getUserList(params).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
        this.accounttList = response?.data;
        // this.accounttList.forEach((element, i) => {
        //   this.accounttList[i]['sNo']=this.sNo[i].sNo
        // });
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
    }, (error) => {
      this.toastr.error(error.error.message);
      this.showLoader = false;
    });
  }

  getPage(data: any) {
    this.currentPage = data.page;
    this.currentPageLimit = data.limit;
    // this.startCounting = (this.currentPageLimit*this.currentPage)-(this.currentPageLimit-1)
    // this.getSNo(this.currentPage)
    this.getAccounttList();
  }

  onDelete(user: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...user, isDelete: true, deletedData: user?.userName },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._userService.deleteAccount(user?.id).subscribe(
          (res) => {
            if (res.status == 'Ok' && res?.data) {
            this.currentPage = 1;
            this.currentPageLimit = environment.defaultPageLimit;
            // this.startCounting = (this.currentPageLimit*this.currentPage)-(this.currentPageLimit-1)
            // this.getSNo(this.currentPage)
              this.getAccounttList();
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
  getSNo(currentPage){
    this.sNo=[]
    for(let i=this.startCounting;i<=this.currentPageLimit*currentPage;i++){
         this.sNo.push({
          sNo:i
     })
    }
  }
  // searchFilter() {
  //   const formdata = this.searchFilterForm.value;
  //   let x = []
  //   if (formdata.userName !== null) {
  //     x.push({
  //       propertyName: "userName",
  //       value: formdata.userName,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.role !== null) {
  //     x.push({
  //       propertyName: "roleName",
  //       value: formdata.role,
  //       dataType: "String",
  //       caseSensitive: true,
  //       operator: 5
  //     })
  //   }
  //   if (formdata.email !== null) {
  //     x.push({
  //       propertyName: "emailId",
  //       value: formdata.email,
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
    if (this.searchFilterForm.value.userName) {
      this.filters.push({
        propertyName: 'userName',
        value: this.searchFilterForm.value?.userName,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.role) {
      this.filters.push({
        propertyName: 'roleName',
        value: this.searchFilterForm.value?.role,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
    }
    if (this.searchFilterForm.value.email) {
      this.filters.push({
        propertyName: 'emailId',
        value: this.searchFilterForm.value?.email,
        dataType: 'string',
        operator: 5,
        caseSensitive: true,
      });
    }
    this.filters.push({
      "propertyName": "IsDeleted",
      "operator": 0,
      "value": "False",
      "dataType": "Boolean",
      "caseSensitive": true
    })

    this.searchFilter = { andFilters:this.filters };
    this.currentPage = 1;
    this.currentPageLimit = environment.defaultPageLimit;
    this.getAccounttList();
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

  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getAccounttList();
  }

  reset(){
    this.searchFilterForm.reset();
    window.location.reload();
  }


  space(event:any){
    if (event.target.selectionStart === 0 && event.code === 'Space'){
      event.preventDefault();
    }
   }
   
}
