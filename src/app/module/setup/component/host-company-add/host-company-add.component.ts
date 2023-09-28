import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  emailRegEx,
  keyPressAddress,
  keyPressAlpha,
} from 'src/app/shared/common';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastrService } from 'ngx-toastr';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { ViewEncapsulation } from '@angular/compiler';
@Component({
  selector: 'app-host-company-add',
  templateUrl: './host-company-add.component.html',
  styleUrls: ['./host-company-add.component.scss']
})
export class HostCompanyAddComponent implements OnInit {
  addForm: FormGroup;
  showLoader = false;
  floor :any= [];
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  buildNameList: any;
  currentTenant: any;
  selectedCategory: any;
  CategoryList: any;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  FloorManagementList: any;
  selectFloorList = [];
  submitted: boolean;
  selected: any;
  filter: any = [];
  buildingList: any;
  buildingName: any;
  buildingfloorList: any;
  submitted2 = false;
  companyList:any = [];
  newfloor:any=[];
  SelectedBuildingFloor:any=[];
  buildingmanageList:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public translate: TranslateService,
    public location: Location,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    private translateService: TranslateService
  ) {
    // this.getFloorManagementList()
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      // if (this.isEditing) {
      //   this.getEditObject();
      // }
    }

    this.addForm = this.fb.group({
      companyName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        ]),
      ],
      floor: ['', Validators.compose([Validators.required])],
      buildingName: ['', Validators.compose([Validators.required])],
      contactPerson: ['', Validators.compose([Validators.required])],
      unitNo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/),
        ]),
      ],
      contactNo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[0-9 ]{8,15}'),
        ]),
      ],
      type: ['VMS'],
    });
  }

  ngOnInit() {
    if (this.isEditing) {
      this.getEditObject();
    }
    this.getBuildings();
  }

  selectFloor(selectedfloor, i) {
    if (selectedfloor?.id != '0') {
      this.floor[i].isSelected = !(selectedfloor?.isSelected);
       this.newfloor = [];
      this.newfloor.push(selectedfloor)
    }
    //  this.floor[i].isSelected=!(floor?.isSelected)
  }

  // getFloorManagementList(): void {
  //   this._setupService.AllFloorManagements({}).subscribe(
  //     (response) => {
  //       this.showLoader = false;
  //       if (response?.data) {
  //         this.FloorManagementList = response?.data;
  //         response?.data.forEach((flr, i) => {
  //           this.floor.push({
  //             name: flr?.floorName,
  //             id: flr?.id,
  //             isSelected: false,
  //           });
  //         });
  //       } else {
  //       }
  //     },
  //     (error) => {
  //       //  this.toastr.error(error.error.message);
  //       this.showLoader = false;
  //     }
  //   );
  // }

  getEditObject() {
    this._setupService
      .getCompanyManagementById(this.editId)
      .subscribe((response) => {
        if (response?.data) {
          this.addForm.patchValue(response?.data);
          this.FloorManagementList = response?.data?.floor;

          this.buildingmanageList = response?.data?.buildingName;
          this.getBuildingFloorManagements(this.buildingmanageList)
         
          this.FloorManagementList.forEach((flr, i) => {
            this.SelectedBuildingFloor = flr?.name
            this.newfloor = [];
            this.newfloor.push(flr)
            if (flr?.id == '0') {
              this.floor.push({
                name: flr?.name,
                id: flr?.id,
                isSelected: true,
              });
            } else {
              this.floor.push({
                name: flr?.name,
                id: flr?.id,
                isSelected: false,
              });
            }
          });
          this.addForm.patchValue({
            floor: this.SelectedBuildingFloor
            
          });
        } else {
          this.router.navigateByUrl('/company');
        }
      });
  }

  submitForm() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.showLoader = true;
      if (this.isEditing) { 
        this.addForm.value['floor'] =  this.newfloor;
        let payLoad = this.addForm.value;
        payLoad['id'] = this.editId;
        this._setupService.saveHostCompany(payLoad).subscribe(
          (response) => {
            this.showLoader = false;
            if (response?.status == 'Ok') {
              this._toastService.showMSG(
                this.translateService.instant('FRSM.UPDATE')
              );
              this.back();
              this.router.navigateByUrl('/setup/host-company');
            }
            if (response?.status == 'Error') {
              this._toastService.showMSG(response.message);
            }
            // if (response) {
            //   this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
            //   this.back()
            // } else {
            // }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(
              this.translateService.instant('FRSM.ERROR')
            );
          }
        );
      } else {
        this.addForm.value['floor'] =  this.newfloor;
        let payLoad=this.addForm.value
        this._setupService.saveHostCompany(payLoad).subscribe(
          (response) => {
            this.showLoader = false;

            if (response?.status == 'Ok') {
              this._toastService.showMSG(
                this.translateService.instant('FRSM.SAVE')
              );
              this.back();
              this.router.navigateByUrl('/setup/host-company');
            }
            if (response?.status == 'Error') {
              this._toastService.showMSG(response.message);
            }

            // if (response) {
            //   this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
            //   this.back()
            // } else {
            // }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(
              this.translateService.instant('FRSM.ERROR')
            );
          }
        );
      }
    }
  }

  back() {
    this.location.back();
  }

  getBuildings(): void {
    this._setupService.getBuildings({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.buildingList = response?.data;
          response?.data.forEach((e, i) => {
            this.buildingName = e?.buildingName;
          });
        }
      },
      (error) => {
        //  this.toastr.error(error.error.message);
        this.showLoader = false;
      }
    );
  }

  onselectBuilding(building) {
    this.selected = building?.buildingName;
    this.getBuildingFloorManagements(this.selected);
  }

  getBuildingFloorManagements(buildName): void {
    this._setupService.getFloorList(buildName, 'VMS').subscribe(
      (response) => {
        this.showLoader = false;
        this.floor = [];
        if (response?.data) {
          this.buildingfloorList = response?.data;
          if (response?.data == '') {
            this.submitted2 = true;
            this._toastService.showMSG(
              this.translateService.instant(
                'No Floor For This Building Please Create'
              )
            );
          } else {
            this.submitted2 = false;
          }
          response?.data.forEach((flr, i) => {
            if (flr?.id == '0') {
              this.floor.push({
                name: flr?.name,
                id: flr?.id,
                isSelected: true,
              });
            } else {
              this.floor.push({
                name: flr?.name,
                id: flr?.id,
                isSelected: false,
              });
            }
          });
        } else {
        }
      },
      (error) => {
        //  this.toastr.error(error.error.message);
        this.showLoader = false;
      }
    );
  }
}
