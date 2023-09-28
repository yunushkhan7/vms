import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { emailRegEx, keyPressAddress, keyPressAlpha } from 'src/app/shared/common';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastrService } from 'ngx-toastr';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';

@Component({
  selector: 'app-frms-door-management-add',
  templateUrl: './frms-door-management-add.component.html',
  styleUrls: ['./frms-door-management-add.component.scss']
})
export class FrmsDoorManagementAddComponent implements OnInit {

  addForm: FormGroup;
  showLoader = false;
  floor:any=[];
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  buildNameList:any
  currentTenant: any;
  selectedCategory:any
  CategoryList :any;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  FloorManagementList:any
  selectFloorList=[];
  submitted :boolean;
  endpointlist: any;
  filter:any = []
  buildingList: any;
  buildingName:any;
  buildingfloorList: any;
  companyList:any = [];
  selected: any;
  submitted2=false;
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
    private translateService: TranslateService,
    private _frsmSettingsService: FrsmSettingsService
  ) {
   // this.getFloorManagementList()
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      doorName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      floor: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      buildingName: ['', Validators.compose([Validators.required])],
      range: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      // companyName: ['', Validators.compose([])],
      endPointsIn: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      endPointsOut: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])]
    },
    );

  }

  ngOnInit() {
   this.getAllDoorDeviceName();
   this.getBuildings();
   this.getCompanyManagements();
  }

  selectFloor(selectedfloor,i){
 this.floor[i].isSelected=!(selectedfloor?.isSelected)
 this.newfloor = [];
 this.newfloor.push(selectedfloor)
  }

  getFloorManagementList(): void {
    this._setupService.AllFloorManagements({}).subscribe((response) => {
      this.showLoader = false;
      if (response?.data) {
            this.FloorManagementList=response?.data
            response?.data.forEach((flr,i) => {
                 this.floor.push({
                  name:flr?.floorName,
                  id:flr?.id,
                  isSelected:false
                 })
            });
          } else {
      }
    }, (error) => {
    //  this.toastr.error(error.error.message);
      this.showLoader = false;

    });
  }

  getEditObject() {
    this._setupService.getCompanyManagementById(this.editId).subscribe((response) => {
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
    this.submitted = true
    if (this.addForm.valid) {
      this.showLoader = true;
      if (this.isEditing) {
        this.addForm.value['floor'] =  this.newfloor;
        let payLoad=this.addForm.value
        payLoad['id']=this.editId
        this._setupService.saveDoorsManagement(payLoad)
          .subscribe(
            (response) => {
              this.showLoader = false;
              if (response) {
                this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
                this.back()
              } else {
              }
            },
            (error) => {
              this.showLoader = false;
              this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
            }
          );
      } else {
        this.addForm.value['floor'] =  this.newfloor;
        let payLoad=this.addForm.value
        this._setupService.saveDoorsManagement(payLoad).subscribe(
          (response) => {
            this.showLoader = false;
            if (response) {
              this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
              this.back()
            } else {
            }
          },
          (error) => {
            this.showLoader = false;
            this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'))
          }
        );
      }
    }
  }



back(){
  this.location.back()
}

getAllDoorDeviceName(): void {
  this._frsmSettingsService.getAllDoorDeviceName({}).subscribe(
    (response) => {
      this.showLoader = false;
      if (response?.data) {
        this.endpointlist = response?.data;
      } else {
      }
    },
    (error) => {
      this.showLoader = false;
    }
  );
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
        // this.floor=[]
        // response?.data.forEach((flr, i) => {
        //   this.floor.push({
        //     name: flr?.floorName,
        //     id: flr?.id,
        //     isSelected: false,
        //   });
        // });

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


getCompanyManagements(): void {
  const params: any = {
    searchFilter : { andFilters: this.filter},
    sortElement: {
      propertyName: 'CreatedDate',
      sortOrder: -1,
    },
  };
  this.filter.push({
    "propertyName": "Type",
    "operator": 0,
    "value": "FRMS",
    "dataType": "string",
    "caseSensitive": true
  })
  this.filter = []
  this._setupService.getCompanyManagements(params).subscribe(
    (response) => {
      this.showLoader = false;
      if (response?.data) {
        this.companyList = response?.data;
      } else {
      }
    },
    (error) => {
      this.showLoader = false;
    }
  );
}

}
