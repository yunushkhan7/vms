import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class SetupService {
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  addExtraClass: boolean = false;
  API: string = environment.APIEndpoint;
  // constructor(
  //   private http: HttpClient,
  //   private _snackBar: MatSnackBar
  // ) { }


  _selectedTimeSlot = new BehaviorSubject(null);
  _selectedTimeSlotObserv = this._selectedTimeSlot.asObservable();
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this._selectedTimeSlot = new BehaviorSubject(null);
    this._selectedTimeSlotObserv = this._selectedTimeSlot.asObservable();
   }

  frsManagerSetting(data): Observable<any> {
    return this.http.post(`${this.API}FRSManagerSetting/FRSManagerSetting`, data);
  }

  emailSetting(data): Observable<any> {
    return this.http.post(`${this.API}EmailSetting/EmailSetting`, data);
  }

  // Floor
  FloorManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/BuildingFloorManagement/GetBuildingFloorManagements`, data);
  }
  FloorManagements(data): Observable<any> {
    return this.http.post(`${this.API}v1/BuildingFloorManagement/GetBuildingFloorManagements`, data,);
  }
  AllFloorManagements(data): Observable<any> {
    return this.http.post(`${this.API}v1/BuildingFloorManagement/GetBuildingFloorManagements`, data);
  }
  getFloorManagementById(id): Observable<any> {
    return this.http.get(`${this.API}v1/BuildingFloorManagement/GetBuildingFloorManagement?id=${id}`);
  }

  saveFloorManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/BuildingFloorManagement/Save`, data);
  }

  FloorManagementUpdateById(id, data): Observable<any> {
    return this.http.patch(`${this.API}v1/BuildingFloorManagement/Save/${id}`, data);
  }

  deleteFloorManagement(id): Observable<any> {
    return this.http.delete(`${this.API}v1/BuildingFloorManagement/Delete?id=${id}`);
  }

  // building
  saveBuilding(data): Observable<any> {
    return this.http.post(`${this.API}v1/Building/Save`, data);
  }

  getBuildingById(id): Observable<any> {
    return this.http.get(`${this.API}v1/Building/GetBuilding?id=${id}`);
  }

  deleteBuilding(id): Observable<any> {
    return this.http.delete(`${this.API}v1/Building/Delete?id=${id}`);
  }

  // Company
  saveHostCompany(data): Observable<any> {
    return this.http.post(`${this.API}v1/CompanyManagement/Save`, data);
  }

  saveDoorsManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/DoorsManagement/Save`, data);
  }
  companyManagement(data): Observable<any> {
    return this.http.post(`${this.API}DoorManagement/GetAllDoorManagementCompany`, data);
  }

  getCompanyManagementById(id): Observable<any> {
    return this.http.get(`${this.API}v1/CompanyManagement/GetCompanyManagement?id=${id}`);
  }

  deleteCompanyManagement(id): Observable<any> {
    return this.http.delete(`${this.API}v1/CompanyManagement/Delete?id=${id}`);
  }

  getCompanyManagements(data): Observable<any> {
    return this.http.post(`${this.API}v1/CompanyManagement/GetCompanyManagements`, data);
  }

  getDoorsManagements(data): Observable<any> {
    return this.http.post(`${this.API}v1/DoorsManagement/GetDoorsManagements`, data);
  }

  // BlackList
  saveBlackList(data): Observable<any> {
    return this.http.post(`${this.API}v1/VisitorBlackListing/Save`, data);
  }

  getBlackListById(id): Observable<any> {
    return this.http.get(`${this.API}v1/VisitorBlackListing/GetvisitorBlackListing?id=${id}`);
  }

  deleteBlackList(id): Observable<any> {
    return this.http.delete(`${this.API}v1/VisitorBlackListing/Delete?id=${id}`);
  }

  getBlackList(data): Observable<any> {
    return this.http.post(`${this.API}v1/VisitorBlackListing/GetVisitorBlackListings`, data);
  }

  // CheckIn Reports
  getCheckInReport(data): Observable<any> {
    return this.http.post(`${this.API}v1/CheckInReports/GetCheckInReports`, data);
  }

  getCheckInReportEventStatus(): Observable<any> {
    return this.http.get(`${this.API}v1/CheckInReports/GetCheckInReportEventStatus`);
  }

  saveCheckInReport(data): Observable<any> {
    return this.http.post(`${this.API}v1/CheckInReports/Save`, data);
  }
  getCheckInReportById(id): Observable<any> {
    return this.http.get(`${this.API}v1/CheckInReports/GetCheckInReport?id=${id}`);
  }

  deleteCheckInReport(id): Observable<any> {
    return this.http.get(`${this.API}v1/CheckInReports/Delete?id=${id}`);
  }

  VisitorBlacking(id,data): Observable<any> {
    return this.http.post(`${this.API}v1/CheckInReports/VisitorBlacking?visitorcheckinid=${id}`,data);
  }

  VisitorBlackingid(id,Remarks,data): Observable<any> {
    return this.http.post(`${this.API}v1/CheckInReports/VisitorBlacking?visitorcheckinid=${id}&Remarks=${Remarks}`,data);
  }

  //Role
  getRoles(data): Observable<any> {
    return this.http.get(`${this.API}v1/Roles/GetAllRoles`);
  }

  getvisitPurposes(data): Observable<any> {
    return this.http.post(`${this.API}Purposes/GetAllPurposes`, data);
  }

  // VisitorAccessLogs
  saveVisitorAccessLogs(data): Observable<any> {
    return this.http.post(`${this.API}v1/VisitorAccessLogs/Save`, data);
  }
  getVisitorAccessLogs(data): Observable<any> {
    return this.http.post(`${this.API}v1/VisitorAccessLogs/GetVisitorAccessLogs`, data);
  }

  getEventTypeList(data): Observable<any> {
    return this.http.get(`${this.API}v1/VisitorAccessLogs/GetEventTypeList`, data);
  }

  getVisitorAccessLogById(id): Observable<any> {
    return this.http.get(`${this.API}v1/VisitorAccessLogs/GetVisitorAccessLog?id=${id}`);
  }

  deleteVisitorAccessLog(id): Observable<any> {
    return this.http.get(`${this.API}v1/VisitorAccessLogs/Delete?id=${id}`);
  }
  getLiscenseKeyList(data): Observable<any> {
    return this.http.post(`${this.API}License/GetAllLicenses`, data);
  }

  // Kisok

  saveKiosk(data): Observable<any> {
    return this.http.post(`${this.API}v1/kioskManagement/Save`, data);
  }

  getKioskById(id): Observable<any> {
    return this.http.get(`${this.API}v1/kioskManagement/GetkioskManagement?id=${id}`);
  }

  deleteKiosk(id): Observable<any> {
    return this.http.delete(`${this.API}v1/kioskManagement/Delete?id=${id}`);
  }
  getGetAllkisoksList(data): Observable<any> {
    return this.http.post(`${this.API}v1/kioskManagement/GetkioskManagements`, data);
  }

  getKisokName(data): Observable<any> {
    return this.http.get(`${this.API}v1/CheckInReports/GetKisokName`, data);
  }

  getKioskThickClien(data): Observable<any> {
    return this.http.get(`${this.API}v1/KioskThickClient/GetDeclarations`, data);
  }

  EnableDisableVisitorRegistrations(boolval){
    return this.http.get(`${this.API}v1/kioskManagement/Enable-DisableVisitorRegistrations?visitorRegistration=${boolval}`);
  }
  EnableDisableHeightendMode(boolval){
    return this.http.get(`${this.API}v1/kioskManagement/Enable-DisableHeightendMode?HeightendMode=${boolval}`);
  }
  EnableDisableselfDeclaration(boolval){
    return this.http.get(`${this.API}v1/kioskManagement/Enable-DisableselfDeclaration?selfDeclaration=${boolval}`);
  }

  // DataRetention
  saveDataRetention(data): Observable<any> {
    return this.http.post(`${this.API}v1/DataRetention/Save`, data);
  }
  getDataRetention(): Observable<any> {
    return this.http.get(`${this.API}v1/DataRetention/GetDataRetension`);
  }

  // SelfDeceleration
  saveSelfDeceleration(data): Observable<any> {
    return this.http.post(`${this.API}v1/SelfDeclaration/Save`, data);
  }
  getSelfDeceleration(): Observable<any> {
    return this.http.get(`${this.API}v1/SelfDeclaration/GetSelfDeclaration`);
  }


  getAccounttList(data): Observable<any> {
    return this.http.post(`${this.API}Account/GetAllAccounts`, data);
  }

  getBuildingName(data): Observable<any> {
    return this.http.post(`${this.API}v1/Building/GetBuildings`, data);
  }

  getIOTriggers(data): Observable<any> {
    return this.http.post(`${this.API}IOTrigger/GettAllIOTriggers`, data);
  }

  investigation(data): Observable<any> {
    return this.http.post(`${this.API}Investigation/Investigation`, data);
  }

  getFRSMLogList(data): Observable<any> {
    return this.http.post(`${this.API}Logs/GetAllLogs`, data);
  }


  getFRSMDoorManagementList(data): Observable<any> {
    return this.http.post(`${this.API}v1/DoorDevicesManagement/GetDoorDevicesManagements`, data);
  }


  getBuildings(data): Observable<any> {
    return this.http.post(`${this.API}v1/Building/GetBuildings`, data);
  }

  getBuildingFloorManagements(data): Observable<any> {
    return this.http.post(`${this.API}v1/BuildingFloorManagement/GetBuildingFloorManagements`, data);
  }

  getFloorList(BuildingName,type): Observable<any> {
    return this.http.get(`${this.API}v1/CompanyManagement/GetFloorList?BuildingName=${BuildingName}&type=${type}`);
  }

}
