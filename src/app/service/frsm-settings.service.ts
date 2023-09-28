import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FrsmSettingsService {
  API: string = environment.APIEndpoint;
  constructor(
    private http: HttpClient,
  ) { }

  getFRSMEmailNotificationList(data): Observable<any> {
    return this.http.post(`${this.API}EmailNotification/GetAllEmailNotifications`, data);
  }

  getFRSMLicenseList(data): Observable<any> {
    return this.http.post(`${this.API}Liscences/GetAllLiscences`, data);
  }

  // QRCodeReader
  getQRCodeReaderList(data): Observable<any> {
    return this.http.post(`${this.API}v1/QrCodeManagement/GetQrCodeManagements`, data);
  }

  getQRCodeReaderById(id): Observable<any> {
    return this.http.get(`${this.API}v1/QrCodeManagement/GetQrCodeManagement?id=${id}`);
  }

  saveQRCodeReader(data): Observable<any> {
    return this.http.post(`${this.API}v1/QrCodeManagement/Save`, data);
  }

  deleteQRCodeReader(id): Observable<any> {
    return this.http.delete(`${this.API}v1/QrCodeManagement/Delete?id=${id}`);
  }

   // IOBoxManagement
   getIOBoxManagementList(data): Observable<any> {
    return this.http.post(`${this.API}v1/IOBoxManagement/GetIOBoxManagements`, data);
  }

  getIOBoxManagementById(id): Observable<any> {
    return this.http.get(`${this.API}v1/IOBoxManagement/GetIOBoxManagement?id=${id}`);
  }

  saveIOBoxManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/IOBoxManagement/Save`, data);
  }

  deleteIOBoxManagement(id): Observable<any> {
    return this.http.delete(`${this.API}v1/IOBoxManagement/Delete?id=${id}`);
  }

  // QRCodeRange
  getQRCodeRange(): Observable<any> {
    return this.http.get(`${this.API}v1/QRCodeRange/GetQRCodeRanges`);
  }

  getALLACSServer(): Observable<any> {
    return this.http.get(`${this.API}v1/ACSServer/GetACSServer`);
  }
  saveACSServer(data): Observable<any> {
    return this.http.post(`${this.API}v1/ACSServer/Save`, data);
  }

  saveQRCodeRange(data): Observable<any> {
    return this.http.post(`${this.API}v1/QRCodeRange/Save`, data);
  }

  frsmSMTP(data): Observable<any> {
    return this.http.post(`${this.API}SMTPsettings/Save`, data);
  }

  getFrsmVMSList(data): Observable<any> {
    return this.http.post(`${this.API}VMS/GetAllVMS`, data);
  }


  // DoorDevicesManagement
  getDoorDevicesManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/DoorDevicesManagement/GetDoorDevicesManagements`, data);
  }

  getDoorDevicesManagementById(id): Observable<any> {
    return this.http.get(`${this.API}v1/DoorDevicesManagement/GetDoorDevicesManagement?id=${id}`);
  }

  saveDoorDevicesManagement(data): Observable<any> {
    return this.http.post(`${this.API}v1/DoorDevicesManagement/Save`, data);
  }

  deleteDoorDevicesManagement(id): Observable<any> {
    return this.http.delete(`${this.API}v1/DoorDevicesManagement/Delete?id=${id}`);
  }

  getGetDropDownQRCode(data): Observable<any> {
    return this.http.get(`${this.API}v1/DoorDevicesManagement/GetDropDownQRCode`);
  }

  getGetDropDownIOBox(data): Observable<any> {
    return this.http.get(`${this.API}v1/DoorDevicesManagement/GetDropDownIO_Box`);
  }



  getAllDoorDeviceName(data): Observable<any> {
    return this.http.get(`${this.API}v1/DoorDevicesManagement/GetAllDoorDeviceName`);
  }

  // FRservermanagment
  getFRservermanagment(): Observable<any> {
    return this.http.get(`${this.API}v1/FRserverManagment/GetFRservermanagments`);
  }


  saveFRservermanagment(data): Observable<any> {
    return this.http.post(`${this.API}v1/FRserverManagment/Save`, data);
  }
}
