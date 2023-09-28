import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { environment } from 'src/environments/environment';
import { decryptValue } from '../shared/common';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isShort: boolean;
  API_URL: string = environment.APIEndpoint;
  DateFormatter = {
    monthNames: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    formatDate: function (date, format) {
      var self = this;
      format = self.getProperDigits(format, /d+/gi, date?.getDate());
      format = self.getProperDigits(format, /M+/g, date?.getMonth() + 1);
      format = format.replace(/y+/gi, function (y) {
        var len = y.length;
        var year = date?.getFullYear();
        if (len == 2)
          return (year + "").slice(-2);
        else if (len == 4)
          return year;
        return y;
      })
      format = self.getProperDigits(format, /H+/g, date?.getHours());
      format = self.getProperDigits(format, /h+/g, self?.getHours12(date?.getHours()));
      format = self.getProperDigits(format, /m+/g, date?.getMinutes());
      format = self.getProperDigits(format, /s+/gi, date?.getSeconds());
      format = format.replace(/a/ig, function (a) {
        var amPm = self.getAmPm(date?.getHours())
        if (a === 'A')
          return amPm.toUpperCase();
        return amPm;
      })
      format = self.getFullOr3Letters(format, /d+/gi, self.dayNames, date?.getDay())
      format = self.getFullOr3Letters(format, /M+/g, self.monthNames, date?.getMonth())
      return format;
    },
    getProperDigits: function (format, regex, value) {
      return format.replace(regex, function (m) {
        var length = m.length;
        if (length == 1)
          return value;
        else if (length == 2)
          return ('0' + value).slice(-2);
        return m;
      })
    },
    getHours12: function (hours) {
      // https://stackoverflow.com/questions/10556879/changing-the-1-24-hour-to-1-12-hour-for-the-gethours-method
      return (hours + 24) % 12 || 12;
    },
    getAmPm: function (hours) {
      // https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
      return hours >= 12 ? 'pm' : 'am';
    },
    getFullOr3Letters: function (format, regex, nameArray, value) {
      return format.replace(regex, function (s) {
        var len = s.length;
        if (len == 3)
          return nameArray[value].substr(0, 3);
        else if (len == 4)
          return nameArray[value];
        return s;
      })
    }
  }
  constructor(
    private http: HttpClient,
    private jwt: JwtService
  ) { 
          // Setup events
  fromEvent(document, 'mousemove').subscribe(() => this.onInteraction("mousemove"));
  fromEvent(document, 'touchstart').subscribe(() => this.onInteraction("touchstart"));
  fromEvent(document, 'keydown').subscribe(() => this.onInteraction("keydown"));
  }

  fileUpload(file) {
    return this.http.post(`${this.API_URL}v1/Users/UploadFile`, file).toPromise();
  }
  GetCurrentUserProfile(): Observable<any> {
    return this.http.get(`${this.API_URL}user/profile`);
  }
  logout(token): Observable<any> {
    return this.http.post(`${this.API_URL}v1/Authentication/RevokeToken`, { 'refreshToken': token });
  }

  sortData(filedName: any = '', ArrayList: any = []) {
    const data = ArrayList.slice();
    ArrayList = data.sort((a, b) => {
      return (a[filedName] < b[filedName] ? -1 : 1) * (this.isShort ? 1 : -1);
    });
    return ArrayList;
  }

  public idle$: Subject<boolean> = new Subject();
  public wake$: Subject<boolean> = new Subject();

  isIdle = false;
  private idleAfterSeconds =600;
  private countDown;


 onInteraction(a) {
  // Is idle and interacting, emit Wake
  if (this.isIdle) {
    this.isIdle = false;
    this.wake$.next(true);
  }

  // User interaction, reset start-idle-timer
  clearTimeout(this.countDown);
  this.countDown = setTimeout(() => {
    // Countdown done without interaction - emit Idle
    this.isIdle = true;
    this.idle$.next(true);
  }, this.idleAfterSeconds * 1_000)
 }

}
