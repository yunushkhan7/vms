import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginationService } from 'src/app/service/pagination.service';
import { environment } from 'src/environments/environment';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-frsm-io-box',
  templateUrl: './frsm-io-box.component.html',
  styleUrls: ['./frsm-io-box.component.scss']
})
export class FrsmIoBoxComponent implements OnInit {
  showLoader = false;
  frsmIOBoxManagementList: any = [];
  pagination: any = null;
  showPagination: boolean = false;
  currentPageLimit = environment.defaultPageLimit;
  currentPage: any = 1;
  columnNumberPrefix: number;
  recordCount: any;
  panelOpenState: boolean = false;
  step = 0;
  isShort: any = false;
  sortFieldName: any;
  lastpage: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private paginationService: PaginationService,
    private _toastService: ToastServiceService,
    private _frsmSettingsService: FrsmSettingsService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.getIOBoxManagementList()
  }

  getIOBoxManagementList(): void {
    const payLoad: any = {
      page: this.currentPage,
      pageSize: this.currentPageLimit,
      sortElement: {
        propertyName: 'CreatedDate',
        sortOrder: -1,
      },
    };
    if (this.sortFieldName) {
      payLoad.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }
    this._frsmSettingsService.getIOBoxManagementList(payLoad).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
        this.frsmIOBoxManagementList = response?.data
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
    this.getIOBoxManagementList();
  }
  sortData(name) {
    this.isShort = !this.isShort;
    this.sortFieldName = name;
    this.getIOBoxManagementList();
  }

  onDelete(IObox: any): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...IObox, isDelete: true, deletedData: IObox?.name },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
        this._frsmSettingsService.deleteIOBoxManagement(IObox?.id).subscribe(
          (res) => {
            if (res?.status == 'Ok' && res?.data) {
              this.currentPage = 1;
              this.currentPageLimit = environment.defaultPageLimit;
              this.getIOBoxManagementList();
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

  setStep(index: number) {
    this.step = index;
    this.panelOpenState = true;
  }

  DownloadExcel() {
    const excelData : any = {
      "isDownload": true,
      sortElement: {
        propertyName: 'CreatedDate',
        sortOrder: -1,
      },
    };
    if (this.sortFieldName) {
      excelData.sortElement = {
        "propertyName": this.sortFieldName,
        "sortOrder": this.isShort ? 1 : -1
      }
    }
    this._frsmSettingsService.getIOBoxManagementList(excelData).subscribe((res: any) => {
      if (res?.status == 'Ok') {
        window.location.href = res?.data;
      }
    })
  }

}
