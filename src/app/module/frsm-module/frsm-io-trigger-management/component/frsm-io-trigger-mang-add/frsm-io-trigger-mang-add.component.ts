import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { FrsmSettingsService } from 'src/app/service/frsm-settings.service';
import { SetupService } from 'src/app/service/setup.service';
@Component({
  selector: 'app-frsm-io-trigger-mang-add',
  templateUrl: './frsm-io-trigger-mang-add.component.html',
  styleUrls: ['./frsm-io-trigger-mang-add.component.scss']
})
export class FrsmIoTriggerMangAddComponent implements OnInit {
  addForm: FormGroup;
  showLoader = false;
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
  floorManagementList: any;
  QRCodeList: any;
  IOBoxList: any;
  submitted :boolean;
  filter:any = []
  buildingList: any;
  buildingName:any;
  buildingfloorList: any;
  selected: any;
  FloorManagementList:any
  floor:any=[];
  submitted2=false;
  newfloor:any=[];
  SelectedBuildingFloor:any=[];
  buildingmanageList:any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public location: Location,
    public _setupService: SetupService,
    private _toastService: ToastServiceService,
    private _frsmSettingsService: FrsmSettingsService,
    private translateService: TranslateService,
  ) {
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    }

    this.addForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
      floor: ['', Validators.compose([Validators.required])],
      buildingName: ['', Validators.compose([Validators.required])],
      floorId: ['', Validators.compose([])],
      qRcodeReader: ['', Validators.compose([Validators.required])],
      qRcodeReaderId: ['', Validators.compose([])],
      iO_Box: ['', Validators.compose([Validators.required])],
      iO_BoxId: ['', Validators.compose([])],
    },
    );

  }

  ngOnInit() {
    // this.getFloorManagementList();
    this.getGetDropDownQRCode();
    this.getGetDropDownIOBox();
    this.getBuildings();
  }


  getEditObject() {
    this._frsmSettingsService.getDoorDevicesManagementById(this.editId).subscribe((response) => {
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
        //this.router.navigateByUrl('/company');
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
        this._frsmSettingsService.saveDoorDevicesManagement(payLoad)
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
        this._frsmSettingsService.saveDoorDevicesManagement(payLoad).subscribe(
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

  // getFloorManagementList(): void {
  //   this._setupService.FloorManagements({}).subscribe(
  //     (response) => {
  //       this.showLoader = false;
  //       if (response?.data) {
  //         this.floorManagementList = response?.data;
  //       } else {
  //       }
  //     },
  //     (error) => {
  //       this.showLoader = false;
  //     }
  //   );
  // }

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

  getGetDropDownQRCode(): void {
    this._frsmSettingsService.getGetDropDownQRCode({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.QRCodeList = response?.data;
          if(response?.data==''){
            this._toastService.showMSG(this.translateService.instant('Please create QR Code Reader and IO-Box'))
          }
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  getGetDropDownIOBox(): void {
    this._frsmSettingsService.getGetDropDownIOBox({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.IOBoxList = response?.data;
        } else {
        }
      },
      (error) => {
        this.showLoader = false;
      }
    );
  }

  selectData(selectedData,selectType){
    if(selectType == 'floor'){
      this.addForm.patchValue({
        floorId:selectedData?.id
      });
    }else if(selectType == 'QR'){
      this.addForm.patchValue({
        qRcodeReaderId:selectedData?.id
      });

    }else if(selectType == 'ioBox'){
      this.addForm.patchValue({
        iO_BoxId:selectedData?.id
      });
    }

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

  selectFloor(selectedfloor,i){
  this.floor[i].isSelected=!(selectedfloor?.isSelected)
  this.newfloor = [];
  this.newfloor.push(selectedfloor)
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


}

