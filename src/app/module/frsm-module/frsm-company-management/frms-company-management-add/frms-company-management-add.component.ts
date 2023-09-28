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

@Component({
  selector: 'app-frms-company-management-add',
  templateUrl: './frms-company-management-add.component.html',
  styleUrls: ['./frms-company-management-add.component.scss'],
})
export class FrmsCompanyManagementAddComponent implements OnInit {
  addForm: FormGroup;
  showLoader = false;
  floor = [];
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
  buildingList: any;
  buildingName:any;
  buildingfloorList: any;
  selectFloorList = [];
  submitted: boolean;
  filter:any = []
  submitted2=false;
  
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
    // this.getFloorManagementList();
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      companyName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      floor: ['', Validators.compose([Validators.required])],
      buildingName: ['', Validators.compose([Validators.required])],
      contactPerson: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      unitNo: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      contactNo: ['', Validators.compose([Validators.required, Validators.pattern("[0-9 ]{8,15}")])],
      type: ['FRMS'],
    });
  }

  ngOnInit() {
    this.getBuildings();
  }

  selectFloor(floor, i) {
    this.floor[i].isSelected = !floor?.isSelected;
  }

  getFloorManagementList(): void {
    this._setupService.AllFloorManagements({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.FloorManagementList = response?.data;
          response?.data.forEach((flr, i) => {
            this.floor.push({
              name: flr?.floorName,
              id: flr?.id,
              isSelected: false,
            });
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

  getEditObject() {
    this._setupService
      .getCompanyManagementById(this.editId)
      .subscribe((response) => {
        if (response?.data) {
          this.addForm.patchValue(response?.data);
          this.FloorManagementList = response?.data?.floor;

          this.floor = [];
          for (let d of response?.data?.floor) {
           let d1 = {
            name: d?.name,
            id: d?.id,
            isSelected: true,
           }
   
           this.floor.push(d1)
         }
          this.addForm.patchValue({
            floor: this.floor,
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
        let payLoad = this.addForm.value;
        payLoad['id'] = this.editId;
        this._setupService.saveHostCompany(payLoad).subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(
                this.translateService.instant('FRSM.UPDATE')
              );
              this.back();
            } else {
            }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(
              this.translateService.instant('FRSM.ERROR')
            );
          }
        );
      } else {
        this._setupService.saveHostCompany(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(
                this.translateService.instant('FRSM.SAVE')
              );
              this.back();
            } else {
            }
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
  selected: any;
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

  onselectBuilding(building){
    this.selected = building?.buildingName
    this.getBuildingFloorManagements(this.selected);
  }

  getBuildingFloorManagements(buildName): void {
    const params: any = {
      searchFilter : { andFilters: this.filter},
    };
    this.filter.push({
      "propertyName": "BuildingName",
      "operator": 0,
      "value": buildName,
      "dataType": "string",
      "caseSensitive": true
    })

    this.filter = []
    
    this._setupService.getBuildingFloorManagements(params).subscribe(
      (response) => {
        this.showLoader = false;
        
        if (response?.data) {
          this.buildingfloorList = response?.data;
          if(response?.data==''){
            this.submitted2 = true;
            this._toastService.showMSG(this.translateService.instant('No Floor For This Building Please Create'))
          }else{
          this.submitted2 = false;
          }
          this.floor = [];
          for (let d of response?.data) {
           let d1 = {
            name: d?.floorName,
            id: d?.id,
            isSelected: false,
           }
   
           this.floor.push(d1)
         }


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
