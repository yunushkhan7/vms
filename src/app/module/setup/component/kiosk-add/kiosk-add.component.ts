import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import {
  emailRegEx,
  keyPressAddress,
  keyPressAlpha,
} from 'src/app/shared/common';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe, Location } from '@angular/common';
import { SetupService } from 'src/app/service/setup.service';
import { ToastrService } from 'ngx-toastr';
import { ToastServiceService } from 'src/app/service/toast-service.service';
import { MYCustomValidators } from 'src/app/shared/custom-validators';
import { v4 as uuidv4 } from 'uuid';
import { ActionPopupComponent } from 'src/app/core/action-popup/action-popup.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-kiosk-add',
  templateUrl: './kiosk-add.component.html',
  styleUrls: ['./kiosk-add.component.scss'],
})
export class KioskAddComponent implements OnInit {
  date: any = new Date();
  addForm: FormGroup;
  showLoader = false;
  formErrors = {
    email: null,
    apierror: null,
  };
  isEditing = false;
  editId = null;
  floorNameList: any = [];
  buildingNameList: any = [];
  currentTenant: any;
  selectedCategory: any;
  CategoryList: any;
  selectedProfileFile: any;
  selectedFile: any;
  url: any;
  FloorManagementList: any;
  visitorRegistrationsHours: [];
  submitted: boolean;
  submitted2 = false;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public enableMeridian = true;
  custumVisitorHours: any = []
  custumStarTime: any = []
  custumEndTime: any = []
  updatedselectedTimeSlot: any = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday:[]
  }
  selectedTimeSlot: any = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday:[]
  }
  hide = true;
  selectedEndTimeArray = [];
  selectedDayArray = [];
  selectedStartTimeArray = [];
  isError = false;
  Monday: any = {
    startTime: [],
    endTime: []
  }
  Tuesday: any = {
    startTime: [],
    endTime: []
  }

  Wednesday: any = {
    startTime: [],
    endTime: []
  }

  Thursday: any = {
    startTime: [],
    endTime: []
  }

  Friday: any = {
    startTime: [],
    endTime: []
  }

  Saturday: any = {
    startTime: [],
    endTime: []
  }
  Sunday: any = {
    startTime: [],
    endTime: []
  }
  timingArray: any = [
    "00:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
    "03:00",
    "03:30",
    "04:00",
    "04:30",
    "05:00",
    "05:30",
    "06:00",
    "06:30",
    "07:00",
    "07:30",
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
    "22:30",
    "23:00",
    "23:30",
    "00:00"
  ];

  selectedweakday: any
  dayOnly = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  days = [
    {
      name: 'Monday',
      isSelected: false,
      id: 1
    },
    {
      name: 'Tuesday',
      isSelected: false,
      id: 2
    },
    {
      name: 'Wednesday',
      isSelected: false,
      id: 3
    },
    {
      name: 'Thursday',
      isSelected: false,
      id: 4
    },
    {
      name: 'Friday',
      isSelected: false,
      id: 5
    },
    {
      name: 'Saturday',
      isSelected: false,
      id: 6
    },
    {
      name: 'Sunday',
      isSelected: false,
      id: 7
    }
  ];

  get f() {
    return this.addForm.controls;
  }
  get t() {
    return this.f['visitorHours'] as FormArray;
  }
  minDate: any;
  maxDate: any;
  hide1 = true;
  visitorStartTime: any;
  visitorendtime: any;
  slectedStartTime: any = []
  visitingDayStartEndTimeArr: any = [];
  inputedit:boolean= false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public translate: TranslateService,
    public location: Location,
    private _toastService: ToastServiceService,
    private _setupService: SetupService,
    private translateService: TranslateService,
    private datePipe: DatePipe,
    public dialog: MatDialog
  ) {
    this.selectSlot()
    let abc = [8, 9, 10, 11, 12]
    let maxEndTime = Math.max(...abc);
   
    let a = abc.slice(8, -1)
   




    this.addForm = this.fb.group(
      {
        userName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
        // buildingId: ['', Validators.compose([Validators.required])],
        buildingName: ['', Validators.compose([Validators.required])],
        password: ['', [
          Validators.required,
          // check whether the entered password has a number
          // MYCustomValidators.patternValidator(/\d/, { hasNumber: true }),
          // check whether the entered password has upper case letter
          MYCustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          // check whether the entered password has a lower case letter
          MYCustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          // check whether the entered password has a special character
          MYCustomValidators.patternValidator(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            { hasSpecialCharacters: true }
          ),
          Validators.minLength(8),
        ]],
        confirm_password: ['', Validators.compose([Validators.required])],
        kisokId: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
        kisokName: ['', Validators.compose([Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)])],
        allowVisitorRegistrations: [
          false,
          Validators.compose([Validators.required]),
        ],
        heightendMode: [false, Validators.compose([Validators.required])],
        selfDeclaration: [false, Validators.compose([Validators.required])],
        status: [false, Validators.compose([Validators.required])],
        visitorHours: new FormArray([]),
      },
      {
        validator: MYCustomValidators.passwordValidation(),
      }
    );
    if (this.activatedRoute.snapshot.paramMap.get('id')) {
      this.isEditing = true;
      this.editId = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.isEditing) {
        this.getEditObject();
      }
    } else {
      this.t.push(
        this.fb.group({
          day: ['', Validators.compose([Validators.required])],
          startTime: ['', Validators.compose([Validators.required])],
          endTime: ['', Validators.compose([Validators.required])],
        })
      );
    }
  }

  ngOnInit() {
    this.getfloorNameList();
    this.getBuildingName();
  }

  eDateChangedStart(res: any) {
    this.minDate = res.value;
  }

  getfloorNameList(): void {
    this._setupService.FloorManagements({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.floorNameList = response?.data;
        } else {
        }
      },
      (error) => {
        //this.toastr.error(error.error.message);
        this.showLoader = false;
      }
    );
  }

  getBuildingName(): void {
    this._setupService.getBuildingName({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.buildingNameList = response?.data;
        } else {
        }
      },
      (error) => {
        //this.toastr.error(error.error.message);
        this.showLoader = false;
      }
    );
  }

  // selectBuilding(building) {
  //   this.addForm.patchValue({
  //     buildingId: building?.id
  //   });
  // }
  daykey: any
  selectFloor(floor) {
    this.addForm.patchValue({
      floorId: floor?.id,
    });
  }

  getFloorManagementList(): void {
    this._setupService.AllFloorManagements({}).subscribe(
      (response) => {
        this.showLoader = false;
        if (response?.data) {
          this.FloorManagementList = response?.data;
        } else {
        }
      },
      (error) => {
        //  this.toastr.error(error.error.message);
        this._toastService.showMSG(this.translateService.instant('FRSM.ERROR'));
        this.showLoader = false;
      }
    );
  }

  // getEditObject() {
  //   this._setupService.getKioskById(this.editId).subscribe((response) => {
  //     if (response?.data) {
  //       let editVisitor: any = []
  //       let editVisitorStartTime: any = []
  //       let editVisitorEndTime: any = []
  //       response?.data?.visitorHours.forEach((visitor, i) => {
  //         this.add();
  //         this.visitorStartTime = visitor?.startTime
  //         this.visitorendtime = visitor?.endTime
  //         this[visitor?.day].startTime[i] = visitor?.startTime
  //         this[visitor?.day].endTime[i] = visitor?.endTime
  //         let d = {
  //           [visitor?.day]: {
  //             startTime: this[visitor?.day].startTime,
  //             endTime: this[visitor?.day].endTime
  //           }
  //         }
  //         this.visitingDayStartEndTimeArr.push(d)
  //       });
     
  //       this.days.forEach((user, i) => {
  //         if (this.selectedweakday?.id == user?.id) {
  //           this.days[i].isSelected = true
  //         }
  //       });
  //       this.timeEvent(this.visitorStartTime, 'visitorsStartTime');
  //       this.timeEvent(this.visitorendtime, 'visitorsEndTime');

  //       this.addForm.patchValue(response?.data);
  //       this.addForm.patchValue({
  //         confirm_password: this.addForm.value.password
  //       })
  //     } else {
  //       //this.router.navigateByUrl('/company');
  //     }
  //   });
  // }

  getEditObject() {
    this._setupService.getKioskById(this.editId).subscribe((response) => {
      if (response?.data) {
        response?.data?.visitorHours.forEach((visitor, i) => {
          this.add();

        });


        this.addForm.patchValue(response?.data);
        this.addForm.patchValue({
          confirm_password: this.addForm.value.password
        })

        response?.data?.visitorHours.forEach((visitor, i) => {
          this.selectweakday({name:visitor?.day},i);
          this.startTimeSlot(visitor?.startTime,i,this.timingArray?.indexOf(visitor?.startTime));
          this.endTimeSlot(visitor?.endTime,i,this.timingArray?.indexOf(visitor?.endTime));
        });

      } else {
        //this.router.navigateByUrl('/company');
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
        this._setupService.saveKiosk(payLoad).subscribe(
          (response) => {
            this.showLoader = false;

            if (response?.status == "Ok") {
              this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
              this.back();
            }
            if (response?.status == "Error") {
              this._toastService.showMSG(response.message);
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
        this._setupService.saveKiosk(this.addForm.value).subscribe(
          (response) => {
            this.showLoader = false;


            if (response?.status == "Ok") {
              this._toastService.showMSG(this.translateService.instant('FRSM.SAVE'))
              this.back();
            }
            if (response?.status == "Error") {
              this._toastService.showMSG(response.message);
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

  selectweakday(weakday, i) {
    let d = {}
      this.selectedweakday = weakday
      if (this[weakday?.name]?.startTime?.length) {
        d = {
          [weakday?.name]: {
            startTime: this[weakday?.name]?.startTime,
            endTime: this[weakday?.name]?.endTime
          }
        }
        this.addForm.controls['visitorHours']['controls'][i].patchValue({
          startTime: '',
          endTime: ''
        })
      } else {
        d = {
          [weakday?.name]: {
            startTime: [],
            endTime: [],
          }
        }

      }
      this.addForm.controls['visitorHours']['controls'][i].patchValue({
        startTime: '',
        endTime: ''
      })
      let dayKey: any = ''
      if (this.visitingDayStartEndTimeArr.length && this.visitingDayStartEndTimeArr[i]) {
        dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0]

        let startIndex = this.timingArray.indexOf(this[dayKey].startTime[i])
        let endIndex = this.timingArray.indexOf(this[dayKey].endTime[i])
        this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
          if (slot?.timeIndex >= startIndex && slot?.timeIndex <= endIndex) {
            this.updatedselectedTimeSlot[dayKey][i].status = "notSelected"
          }
        });
        let start = startIndex
        let end = endIndex
        let updatedStartTimeIndex: any
        let updatedEndTimeIndex: any
        let uID: any = this.uIDGenrator()
        while (start >= 0) {
          if (this.updatedselectedTimeSlot[dayKey][start]?.status == 'notSelected') {
            updatedStartTimeIndex = start
            start--
          } else {
            break;
          }
        }

        while (end <= this.updatedselectedTimeSlot[dayKey].length - 1) {
          if (this.updatedselectedTimeSlot[dayKey][end]?.status == 'notSelected') {
            updatedEndTimeIndex = end
            end++
          } else {
            break;
          }
        }

        this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
          if (slot?.timeIndex >= updatedStartTimeIndex && slot?.timeIndex <= updatedEndTimeIndex) {
            this.updatedselectedTimeSlot[dayKey][i].id = uID
          }
        });


        this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
        
        this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);

        this[dayKey].startTime[i] = null
        this[dayKey].endTime[i] = null
      }
      this.visitingDayStartEndTimeArr[i] = d
      let dayKey2 = Object.keys(this.visitingDayStartEndTimeArr[i])[0]



  }

  add() {

    this.t.push(
      this.fb.group({
        day: ['', Validators.compose([Validators.required])],
        startTime: ['', Validators.compose([Validators.required])],
        endTime: ['', Validators.compose([Validators.required])],
      })
    );


    this.selectedTimeSlot[this.daykey] = this.updatedselectedTimeSlot[this.daykey]
    this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);


  }

  removeVisitorHours(i) {
    this.t.removeAt(i);
  }
  time1: any;
  time22: any;

  timeEvent(event: any, type: any) {
    if (type == 'visitorsStartTime') {
      this.minDate = event;
      this.time1 = this.minDate;
    }
    if (type == 'visitorsEndTime') {
      this.maxDate = event
      this.time22 = this.maxDate;
      if (this.time1 == this.time22) {
        this.submitted2 = true;
        this._toastService.showMSG(
          this.translateService.instant('End Time Should Be Greater Than Start Time')
        );
      } else {
        this.submitted2 = false;
      }
    }
  }

  uIDGenrator() {
    return uuidv4();
  }

  selectSlot() {
    let id = this.uIDGenrator()
    this.timingArray.forEach((time, i) => {
      this.selectedTimeSlot['Monday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })
      this.selectedTimeSlot['Tuesday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })
      this.selectedTimeSlot['Wednesday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })

      this.selectedTimeSlot['Thursday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })

      this.selectedTimeSlot['Friday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })

      this.selectedTimeSlot['Saturday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })
      this.selectedTimeSlot['Sunday'].push({
        time: time,
        timeIndex: i,
        status: 'notSelected',
        id: id
      })
    });
    this.updatedselectedTimeSlot=this.selectedTimeSlot
    
    this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);
  }



  // startTimeSlot(time, i, startTimeIndex) {
  //   let dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0]

  //    let previousSTI=this.timingArray.indexOf(this[dayKey].startTime[i])
  //    let previousETI=this.timingArray.indexOf(this[dayKey].endTime[i])



    
  //   let status = this.selectedTimeSlot[dayKey][startTimeIndex]?.status
    
  //  if(previousSTI != -1 && previousETI != -1){
  //        this.reFillStartTime(previousSTI,previousETI,dayKey)
  //        this.addForm.controls['visitorHours']['controls'][i].patchValue({
  //         endTime: '',
  //         startTime:''
  //       })
  //       this[dayKey].startTime[i] = ''
  //       this[dayKey].endTime[i] = ''
  //    }
  //   else if (status == 'notSelected') {
  //     this.addStartTimeSlot(dayKey, i, time)
  //   } else {
  //     this.addForm.controls['visitorHours']['controls'][i].patchValue({
  //       startTime: '',
  //       endTime: ''
  //     })
  //     this[dayKey].startTime[i] = ''
  //     this[dayKey].endTime[i] = ''
  //     this._toastService.showMSG("Invalid Time Slot....!!");
  //   }
  // }


  startTimeSlot(time, i, startTimeIndex) {

    let dayKey: any = "";
    // if (
    //   this.visitingDayStartEndTimeArr?.length &&
    //   this.visitingDayStartEndTimeArr[i]
    // ) {
    //   dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0];
    // }
    if(this.visitingDayStartEndTimeArr?.length && this.visitingDayStartEndTimeArr[i]){
      dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0];

      let previousSTI = this.timingArray.indexOf(this[dayKey]?.startTime[i]);
      let previousETI = this.timingArray.indexOf(this[dayKey]?.endTime[i]);
      let currentSTI = this.timingArray.indexOf(time);
      
      let status = this.selectedTimeSlot[dayKey][startTimeIndex]?.status;
      
  
      let preStart = previousSTI - 1;
      let preEnd = previousETI + 1;
      let updatedStartTimeIndex: any = previousSTI;
      let updatedEndTimeIndex: any = previousETI;
  
      while (preStart >= 0) {
        if (
          this.updatedselectedTimeSlot[dayKey][preStart]?.status == "notSelected"
        ) {
          updatedStartTimeIndex = preStart;
          preStart--;
        } else {
          break;
        }
      }
  
      while (preEnd <= this.updatedselectedTimeSlot[dayKey].length - 1) {
        if (
          this.updatedselectedTimeSlot[dayKey][preEnd]?.status == "notSelected"
        ) {
          updatedEndTimeIndex = preEnd;
          preEnd++;
        } else {
          break;
        }
      }
  
         if (previousSTI != -1 && previousETI != -1) {
        if (
          currentSTI >= updatedStartTimeIndex &&
          currentSTI <= updatedEndTimeIndex
        ) {
          this.reFillStartTime2(previousSTI,previousETI,dayKey,updatedStartTimeIndex,updatedEndTimeIndex,time,i);
        } else {
          this.addForm.controls['visitorHours']['controls'][i].patchValue({
            startTime: this[dayKey].startTime[i],
            //  endTime:''
          });
          // this[dayKey].endTime[i]=''
         
          this._toastService.showMSG("Invalid Time Slot....!!");
        }
  
        //  this.addForm.controls['scheduleDetails']['controls'][i].patchValue({
        //   startTime: '',
        //   endTime:''
        // })
        // this[dayKey].startTime[i] = ''
        // this[dayKey].endTime[i] = ''
      } else if (status == "notSelected") {
        this.addStartTimeSlot(dayKey, i, time);
      } else {
        this.addForm.controls['visitorHours']['controls'][i].patchValue({
          startTime: "",
          endTime: "",
        });
        this[dayKey].startTime[i] = "";
        this[dayKey].endTime[i] = "";
        this._toastService.showMSG("Invalid Time Slot....!!");
      }
    }else{
      this.addForm.controls['visitorHours']['controls'][i].patchValue({
        startTime: "",
      });
      this._toastService.showMSG("Please select the day");
    }

  }
//   endTimeSlot(endTime, i, endTimeIndex) {
//     let beforeId = this.uIDGenrator()
//     let afterId = this.uIDGenrator()
//     let centerId = this.uIDGenrator()
//     let dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0]
//     this.daykey = dayKey
//     let startTimeIndex = this.timingArray.indexOf(this[dayKey]?.startTime[i])
//     let startTimeStatus = this.selectedTimeSlot[dayKey][endTimeIndex]?.status
//     let endTimeStatus = this.selectedTimeSlot[dayKey][endTimeIndex]?.status
//     let startTimeId = this.selectedTimeSlot[dayKey][startTimeIndex]?.id
//     let endTimeId = this.selectedTimeSlot[dayKey][endTimeIndex]?.id
//     let previousEndTimeIndex = this.timingArray.indexOf(this.visitingDayStartEndTimeArr[i][dayKey]?.endTime[i])

//     let previousPlusOne:any=previousEndTimeIndex+1
//     let lastNotSelectedEndTimeIndex=previousEndTimeIndex
//     while (previousPlusOne <= this.updatedselectedTimeSlot[dayKey].length - 1) {
//       if (this.updatedselectedTimeSlot[dayKey][previousPlusOne]?.status == 'notSelected') {
//         lastNotSelectedEndTimeIndex=previousPlusOne
//         previousPlusOne++
        
//       } else {
//         break;
//       }
//     }
    

//     if (endTimeIndex == startTimeIndex) {
//       this.endTimeEmpty(dayKey, i)
//       this._toastService.showMSG("End Time And Start Time Can't Be Same");
//     } else if (endTimeIndex < startTimeIndex) {
//       this.endTimeEmpty(dayKey, i)
//       this._toastService.showMSG("End Time Can't Be Less Than Start Time");

//     } else if (previousEndTimeIndex != -1 && i != this.visitingDayStartEndTimeArr.length - 1) {
//       if (endTimeIndex > previousEndTimeIndex && endTimeStatus=='notSelected' && endTimeIndex<=lastNotSelectedEndTimeIndex) {
//         this.abcGreater(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,lastNotSelectedEndTimeIndex)
//       } else if(endTimeIndex < previousEndTimeIndex && endTimeStatus=='selected'){
//         this.abcLess(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,endTimeStatus,endTimeId,lastNotSelectedEndTimeIndex)

//       }else{


//         this.addForm.controls['visitorHours']['controls'][i].patchValue({
//           endTime: this[dayKey].endTime[i]
//         })
       
//         this._toastService.showMSG("Invalid Time Slot....!!");
//       }

//     } else if (previousEndTimeIndex != -1 && i == this.visitingDayStartEndTimeArr.length - 1) {
//         if (endTimeIndex > previousEndTimeIndex && endTimeStatus=='notSelected' && endTimeIndex<=lastNotSelectedEndTimeIndex) {
//           this.abcGreater(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,lastNotSelectedEndTimeIndex)
//         } else if(endTimeIndex < previousEndTimeIndex && endTimeStatus=='selected') {
//           this.abcLess(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,endTimeStatus,endTimeId,lastNotSelectedEndTimeIndex)
//         }else{


//           this.addForm.controls['visitorHours']['controls'][i].patchValue({
//             endTime: this[dayKey].endTime[i]
//           })
          
//           this._toastService.showMSG("Invalid Time Slot....!!");
//         }
//     }
//     else {
//       let stIndex=startTimeIndex
//       let lastNotSelectedEndTimeIndex:any=startTimeIndex
//       while (stIndex <= this.selectedTimeSlot[dayKey].length - 1) {
//         if (this.selectedTimeSlot[dayKey][stIndex]?.status == 'notSelected') {
//           lastNotSelectedEndTimeIndex=stIndex
//           stIndex++
        
//         } else {
//           break;
//         }
//       }
     
// if(endTimeIndex<=lastNotSelectedEndTimeIndex && endTimeStatus=='notSelected'){
//   this.addEndTimeSlot(endTime, dayKey, i, endTimeIndex, startTimeIndex, startTimeId, endTimeId, startTimeStatus, endTimeStatus, beforeId, centerId, afterId,lastNotSelectedEndTimeIndex)
// }else{
//   this.addForm.controls['visitorHours']['controls'][i].patchValue({
//     endTime: this[dayKey].endTime[i]
//   })
//   this._toastService.showMSG("Invalid Time Slot....!!");
// }


//     }




//   }

  endTimeSlot(endTime, i, endTimeIndex) {
    let beforeId = this.uIDGenrator();
    let afterId = this.uIDGenrator();
    let centerId = this.uIDGenrator();
    if(this.visitingDayStartEndTimeArr?.length && this.visitingDayStartEndTimeArr[i]){
    let dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0];
    this.daykey = dayKey;
    

    if(this[dayKey]?.startTime[i]){
    let startTimeIndex = this.timingArray.indexOf(this[dayKey]?.startTime[i]);
    let startTimeStatus = this.selectedTimeSlot[dayKey][endTimeIndex]?.status;
    let endTimeStatus = this.selectedTimeSlot[dayKey][endTimeIndex]?.status;
    let startTimeId = this.selectedTimeSlot[dayKey][startTimeIndex]?.id;
    let endTimeId = this.selectedTimeSlot[dayKey][endTimeIndex]?.id;
    let previousEndTimeIndex = this.timingArray.indexOf(this.visitingDayStartEndTimeArr[i][dayKey]?.endTime[i]);
    let previousPlusOne: any = previousEndTimeIndex + 1;
    let lastNotSelectedEndTimeIndex = previousEndTimeIndex;

    while (previousPlusOne <= this.updatedselectedTimeSlot[dayKey].length - 1) {
      if (
        this.updatedselectedTimeSlot[dayKey][previousPlusOne]?.status ==
        "notSelected"
      ) {
        lastNotSelectedEndTimeIndex = previousPlusOne;
        previousPlusOne++;
      } else {
        break;
      }
    }

    if (endTimeIndex == startTimeIndex) {
      this.endTimeEmpty(dayKey, i);
      this._toastService.showMSG("End Time And Start Time Can't Be Same");
    } else if (endTimeIndex < startTimeIndex) {
      this.endTimeEmpty(dayKey, i);
      this._toastService.showMSG("End Time Can't Be Less Than Start Time");
    } else if ( previousEndTimeIndex != -1 && i != this.visitingDayStartEndTimeArr.length - 1) {
      if ( endTimeIndex > previousEndTimeIndex && endTimeStatus == "notSelected" && endTimeIndex <= lastNotSelectedEndTimeIndex) {
        this.abcGreater(
          endTime,
          i,
          dayKey,
          startTimeIndex,
          endTimeIndex,
          startTimeId,
          startTimeStatus,
          beforeId,
          centerId,
          afterId,
          previousEndTimeIndex,
          lastNotSelectedEndTimeIndex
        );
      } else if ( endTimeIndex < previousEndTimeIndex && endTimeStatus == "selected") {
        this.abcLess(
          endTime,
          i,
          dayKey,
          startTimeIndex,
          endTimeIndex,
          startTimeId,
          startTimeStatus,
          beforeId,
          centerId,
          afterId,
          previousEndTimeIndex,
          endTimeStatus,
          endTimeId,
          lastNotSelectedEndTimeIndex
        );
      } else {
        this.addForm.controls['visitorHours']['controls'][i].patchValue({
          endTime: this[dayKey].endTime[i],
        });
        this._toastService.showMSG("Invalid Time Slot....!!");
      }
    } else if ( previousEndTimeIndex != -1 && i == this.visitingDayStartEndTimeArr.length - 1) {
      if ( endTimeIndex > previousEndTimeIndex && endTimeStatus == "notSelected" && endTimeIndex <= lastNotSelectedEndTimeIndex) {
        this.abcGreater(
          endTime,
          i,
          dayKey,
          startTimeIndex,
          endTimeIndex,
          startTimeId,
          startTimeStatus,
          beforeId,
          centerId,
          afterId,
          previousEndTimeIndex,
          lastNotSelectedEndTimeIndex
        );
      } else if (
        endTimeIndex < previousEndTimeIndex &&
        endTimeStatus == "selected"
      ) {
        this.abcLess(
          endTime,
          i,
          dayKey,
          startTimeIndex,
          endTimeIndex,
          startTimeId,
          startTimeStatus,
          beforeId,
          centerId,
          afterId,
          previousEndTimeIndex,
          endTimeStatus,
          endTimeId,
          lastNotSelectedEndTimeIndex
        );
      } else {
        this.addForm.controls['visitorHours']['controls'][i].patchValue({
          endTime: this[dayKey].endTime[i],
        });
        this._toastService.showMSG("Invalid Time Slot....!!");
      }
    } else {
      let stIndex = startTimeIndex;
      let lastNotSelectedEndTimeIndex: any = startTimeIndex;
      while (stIndex <= this.selectedTimeSlot[dayKey].length - 1) {
        if (this.selectedTimeSlot[dayKey][stIndex]?.status == "notSelected") {
          lastNotSelectedEndTimeIndex = stIndex;
          stIndex++;
        } else {
          break;
        }
      }
      if ( endTimeIndex <= lastNotSelectedEndTimeIndex && endTimeStatus == "notSelected") {
        this.addEndTimeSlot( endTime, dayKey, i, endTimeIndex, startTimeIndex, startTimeId, endTimeId, startTimeStatus, endTimeStatus, beforeId, centerId, afterId, lastNotSelectedEndTimeIndex);
      } else {
        this.addForm.controls['visitorHours']['controls'][i].patchValue({
          endTime: this[dayKey].endTime[i],
        });
        this._toastService.showMSG("Invalid Time Slot....!!");
      }




    }
  }else{
    this._toastService.showMSG("Please Select Start Time");
    this.addForm.controls['visitorHours']['controls'][i].patchValue({
      endTime: "",
    });
  }

   }
   
   
   
   
   
   
   else{
      this.addForm.controls['visitorHours']['controls'][i].patchValue({
        endTime: "",
      });
      this._toastService.showMSG("Please Select The Day");
    }
  }

  endTimeEmpty(dayKey, i) {
    this.addForm.controls['visitorHours']['controls'][i].patchValue({
      endTime: this[dayKey].endTime[i]
    })
    this[dayKey].endTime[i] = this[dayKey].endTime[i]
  }

  addStartTimeSlot(dayKey, i, time) {

    this[dayKey].startTime[i] = time
    this.visitingDayStartEndTimeArr[i][dayKey].startTime = this[dayKey].startTime
    this.addForm.controls['visitorHours']['controls'][i].patchValue({
      startTime:time,
      endTime: ''
    })
    this[dayKey].endTime[i] = ''

  }


  reFillStartTime2(previousSTI,previousETI,dayKey,updatedStartTimeIndex,updatedEndTimeIndex,currentTime,index) {
    let preStart = previousSTI - 1;
    let preEnd = previousETI + 1;
    // let updatedStartTimeIndex: any=previousSTI
    // let updatedEndTimeIndex: any=previousETI
    let uID: any = this.uIDGenrator();
    // while (preStart>= 0) {
    //   if (this.updatedselectedTimeSlot[dayKey][preStart]?.status == 'notSelected') {
    //     updatedStartTimeIndex = preStart
    //     preStart--
    //   } else {
    //     break;
    //   }
    // }

    // while (preEnd <= this.updatedselectedTimeSlot[dayKey].length - 1) {
    //   if (this.updatedselectedTimeSlot[dayKey][preEnd]?.status == 'notSelected') {
    //     updatedEndTimeIndex = preEnd
    //     preEnd++
    //   } else {
    //     break;
    //   }
    // }
    this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
      if (
        slot?.timeIndex >= updatedStartTimeIndex &&
        slot?.timeIndex <= updatedEndTimeIndex
      ) {
        this.updatedselectedTimeSlot[dayKey][i].id = uID;
        this.updatedselectedTimeSlot[dayKey][i].status = "notSelected";
      }
    });

    this.addForm.controls['visitorHours']['controls'][index].patchValue({
      startTime: currentTime,
      endTime: "",
    });
    this[dayKey].startTime[index] = currentTime;
    this[dayKey].endTime[index] = "";

    this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey];
    this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);
  }
  

  // addEndTimeSlot(endTime, dayKey, i, endTimeIndex, startTimeIndex, startTimeId, endTimeId, startTimeStatus, endTimeStatus, beforeId, centerId, afterId,lastNotSelectedEndTimeIndex) {


  //   this.selectedTimeSlot[dayKey].forEach((slot, j) => {

  //     if (slot?.timeIndex >= startTimeIndex && slot?.timeIndex <= endTimeIndex) {
  //       this.updatedselectedTimeSlot[dayKey][j].status = 'selected'
  //       this.updatedselectedTimeSlot[dayKey][j].id = centerId
  //     }
  //     if ((slot?.timeIndex >= (endTimeIndex + 1)) && (slot?.timeIndex <= lastNotSelectedEndTimeIndex)) {
  //       this.updatedselectedTimeSlot[dayKey][j].status = 'notSelected'
  //       this.updatedselectedTimeSlot[dayKey][i].id = afterId
  //     }
  //   });

  //   this[dayKey].endTime[i] = endTime
  //   this.visitingDayStartEndTimeArr[i][dayKey].endTime = this[dayKey]?.endTime
  //     this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
  //     this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);

  // }
  addEndTimeSlot(endTime, dayKey, i, endTimeIndex, startTimeIndex, startTimeId, endTimeId, startTimeStatus, endTimeStatus, beforeId, centerId, afterId,lastNotSelectedEndTimeIndex) {

    this.selectedTimeSlot[dayKey].forEach((slot, j) => {

      if (slot?.timeIndex >= startTimeIndex && slot?.timeIndex <= endTimeIndex) {
        this.updatedselectedTimeSlot[dayKey][j].status = 'selected'
        this.updatedselectedTimeSlot[dayKey][j].id = centerId
      }
      if ((slot?.timeIndex >= (endTimeIndex + 1)) && (slot?.timeIndex <= lastNotSelectedEndTimeIndex)) {
        this.updatedselectedTimeSlot[dayKey][j].status = 'notSelected'
        this.updatedselectedTimeSlot[dayKey][i].id = afterId
      }

    });
    this.addForm.controls['visitorHours']['controls'][i].patchValue({
      endTime:endTime,
    })
    this[dayKey].endTime[i] = endTime
    this.visitingDayStartEndTimeArr[i][dayKey].endTime = this[dayKey]?.endTime
      this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
      this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);
  }


   abcGreater(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,lastNotSelectedEndTimeIndex) {
    let start = startTimeIndex
    let end = endTimeIndex
    let previousETIndex = previousEndTimeIndex
    let updatedEndTimeIndex: any = endTimeIndex
    let endPlusOne = endTimeIndex
    while (endPlusOne <= this.updatedselectedTimeSlot[dayKey].length - 1) {
      if (this.updatedselectedTimeSlot[dayKey][endPlusOne]?.status == 'notSelected') {
        updatedEndTimeIndex=endPlusOne
        endPlusOne++
        
      } else {
        break;
      }
    }

   

    if (end <= updatedEndTimeIndex) {
      this.selectedTimeSlot[dayKey].forEach((slot, j) => {
        if (slot?.timeIndex >= startTimeIndex && slot?.timeIndex <= end) {
          this.updatedselectedTimeSlot[dayKey][j].status = 'selected'
          this.updatedselectedTimeSlot[dayKey][j].id = centerId
        }
        if ((slot?.timeIndex >= (end + 1)) && (slot?.timeIndex <= updatedEndTimeIndex)) {
          this.updatedselectedTimeSlot[dayKey][j].status = 'notSelected'
          this.updatedselectedTimeSlot[dayKey][i].id = afterId
        }
      });
    }
    // else {
    //   this.addForm.controls['visitorHours']['controls'][i].patchValue({
    //     endTime: ''
    //   }

    //   )
    //   //this[dayKey].endTime[i]=''
    // }

    this[dayKey].endTime[i] = endTime
    this.visitingDayStartEndTimeArr[i][dayKey].endTime = this[dayKey]?.endTime
      this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
      this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);
  

  }


    abcLess(endTime,i, dayKey, startTimeIndex, endTimeIndex, startTimeId, startTimeStatus, beforeId, centerId, afterId, previousEndTimeIndex,endTimeStatus,endTimeId,lastNotSelectedEndTimeIndex) {
    let start = startTimeIndex
    let end = endTimeIndex
    let previousETIndex
    let updatedEndTimeIndex: any
    // while (previousETIndex <= this.updatedselectedTimeSlot[dayKey].length - 1) {
    //   if (this.updatedselectedTimeSlot[dayKey][end]?.status == 'notSelected') {
    //     updatedEndTimeIndex = previousETIndex
    //     previousETIndex++
    //   } else {
    //     break;
    //   }
    // }

    this.selectedTimeSlot[dayKey].forEach((slot, j) => {
      if (slot?.timeIndex >= startTimeIndex && slot?.timeIndex <= endTimeIndex && startTimeStatus == endTimeStatus && startTimeId == endTimeId) {
        this.updatedselectedTimeSlot[dayKey][j].status = 'selected'
        this.updatedselectedTimeSlot[dayKey][j].id = centerId
      } else if (slot?.timeIndex > endTimeIndex && slot?.timeIndex <= lastNotSelectedEndTimeIndex) {
        this.updatedselectedTimeSlot[dayKey][j].status = 'notSelected'
        this.updatedselectedTimeSlot[dayKey][i].id = afterId
      }
    });

    this[dayKey].endTime[i] = endTime
    this.visitingDayStartEndTimeArr[i][dayKey].endTime = this[dayKey]?.endTime
      this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
      this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);

  }


  reFillStartTime(previousSTI,previousETI,dayKey){

    let preStart = previousSTI-1
    let preEnd = previousETI+1
    let updatedStartTimeIndex: any=previousSTI
    let updatedEndTimeIndex: any=previousETI
    let uID: any = this.uIDGenrator()
    while (preStart>= 0) {
      if (this.updatedselectedTimeSlot[dayKey][preStart]?.status == 'notSelected') {
        updatedStartTimeIndex = preStart
        preStart--
      } else {
        break;
      }
    }

    while (preEnd <= this.updatedselectedTimeSlot[dayKey].length - 1) {
      if (this.updatedselectedTimeSlot[dayKey][preEnd]?.status == 'notSelected') {
        updatedEndTimeIndex = preEnd
        preEnd++
      } else {
        break;
      }
    }

    
    this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
      if (slot?.timeIndex >= updatedStartTimeIndex && slot?.timeIndex <= updatedEndTimeIndex) {
        this.updatedselectedTimeSlot[dayKey][i].id = uID
        this.updatedselectedTimeSlot[dayKey][i].status = 'notSelected'
      }
    });

    this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
   
    this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);

  }

  // removeTimeSlots(i) {
  //   this.t.removeAt(i);

  //   let dayKey:any=''
  //   if (this.visitingDayStartEndTimeArr.length && this.visitingDayStartEndTimeArr[i]) {
  //      dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0]

  //     let startIndex = this.timingArray.indexOf(this[dayKey]?.startTime[i])
  //     let endIndex = this.timingArray.indexOf(this[dayKey]?.endTime[i])
  //     this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
  //       if (slot?.timeIndex >= startIndex && slot?.timeIndex <= endIndex) {
  //         this.updatedselectedTimeSlot[dayKey][i].status = "notSelected"
  //       }
  //     });
  //     let start = startIndex
  //     let end = endIndex
  //     let updatedStartTimeIndex: any
  //     let updatedEndTimeIndex: any
  //     let uID: any = this.uIDGenrator()
  //     while (start >= 0) {
  //       if (this.updatedselectedTimeSlot[dayKey][start]?.status == 'notSelected') {
  //         updatedStartTimeIndex = start
  //         start--
  //       } else {
  //         break;
  //       }
  //     }

  //     while (end <= this.updatedselectedTimeSlot[dayKey].length - 1) {
  //       if (this.updatedselectedTimeSlot[dayKey][end]?.status == 'notSelected') {
  //         updatedEndTimeIndex = end
  //         end++
  //       } else {
  //         break;
  //       }
  //     }

  //     this.updatedselectedTimeSlot[dayKey].forEach((slot, i) => {
  //       if (slot?.timeIndex >= updatedStartTimeIndex && slot?.timeIndex <= updatedEndTimeIndex) {
  //         this.updatedselectedTimeSlot[dayKey][i].id = uID
  //       }
  //     });


  //     this.selectedTimeSlot[dayKey] = this.updatedselectedTimeSlot[dayKey]
     
  //     this._setupService._selectedTimeSlot.next(this.selectedTimeSlot);

  //   }

  //   this[dayKey]?.startTime.splice(i,1)
  //   this[dayKey]?.endTime.splice(i,1)
  //   this.visitingDayStartEndTimeArr.splice(i,1)

  // }


  removeTimeSlots(i) {
    const kk=this.visitingDayStartEndTimeArr
    // console.log("visitingDayStartEndTimeArr",kk)
    // this.scheduleDetails = this.orderForm.get("scheduleDetails") as FormArray;
  //  this.scheduleDetails.removeAt(i);
   this.t.removeAt(i);
    let dayKey:any=''
    if (this.visitingDayStartEndTimeArr.length && this.visitingDayStartEndTimeArr[i]) {
           dayKey = Object.keys(this.visitingDayStartEndTimeArr[i])[0]
           let previousSTI=this.timingArray.indexOf(this[dayKey]?.startTime[i])
     let previousETI=this.timingArray.indexOf(this[dayKey]?.endTime[i])
    //  console.log("dayKey=>",dayKey)
    //  console.log("previousSTI=>",previousSTI)
    //  console.log("previousETI=>",previousETI)
    if(previousSTI != -1 && previousETI != -1){
      this.reFillStartTime(previousSTI,previousETI,dayKey)
    }
    }
    
      //     console.log("updatedselectedTimeSlot=>",this.updatedselectedTimeSlot)
      // console.log("==============================================================================")
      // console.log("selectedTimeSlot=>",this.selectedTimeSlot)
    this.visitingDayStartEndTimeArr.splice(i,1)

    this.dayOnly.forEach((d:any,vI) => {
      if(this[d]?.startTime.length>=i && this[d]?.endTime.length>=i){
        if(this[d]?.startTime[i]==null && this[d]?.endTime[i]==null){
          this[d].startTime[i]='undefined'
          this[d].endTime[i]='undefined'
        }
        this[d].startTime.splice(i,1)
        this[d].endTime.splice(i,1)
      }
     });



     this.visitingDayStartEndTimeArr.forEach((visitHours, vkIndex) => {
      let dk=Object.keys(this.visitingDayStartEndTimeArr[vkIndex])[0];
      this.visitingDayStartEndTimeArr[vkIndex][dk]=this[dk]
  });

  // console.log("updated visitingDayStartEndTimeArr",this.visitingDayStartEndTimeArr)

  }


  onDelete(i): void {
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '683px',
      height: '554px',
      data: { ...i, isDelete: true },
      panelClass: 'delete-popup',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.is_delete) {
           this.removeTimeSlots(i)
           this._toastService.showMSG("Deleted Sucessfully")
           this.submitForm2();
      }
    });
  }

  submitForm2() {
    this.submitted = true;
    if (this.addForm.valid) {
      this.showLoader = true;

      if (this.isEditing) {
        let payLoad = this.addForm.value;
        payLoad['id'] = this.editId;
        this._setupService.saveKiosk(payLoad).subscribe(
          (response) => {
            this.showLoader = false;

            // if (response?.status == "Ok") {
            //   this._toastService.showMSG(this.translateService.instant('FRSM.UPDATE'))
            //   this.back();
            // }
            // if (response?.status == "Error") {
            //   this._toastService.showMSG(response.message);
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

  editingInputClick(){
    this.inputedit = true
  }
}


