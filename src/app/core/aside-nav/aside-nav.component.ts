import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-aside-nav',
  templateUrl: './aside-nav.component.html',
  styleUrls: ['./aside-nav.component.scss'],
})
export class AsideNavComponent implements OnInit {

  active = 'Report';

  isShown: boolean = false;
  isShown2: boolean = false;
  sidenavshow: boolean = false;
  currentUser: any;
  permissionObject: any = null;
  color: string = '#333';
  toggled: boolean = false;
  isSetup = false;
  isSetting = false;
  constructor(private dataService: DataService) {
    this.dataService.currentUser.subscribe((response) => {
      this.currentUser = response;
    });
    this.dataService.permission.subscribe((response) => {
      this.permissionObject = response?.permissions;
    });
  }

  ngOnInit() {
    this.isShown = true;
    this.isShown2 = true;
    this.sidenavshow = true;
  }


  toggleShow() {
    this.isShown = !this.isShown;
  }
  toggleSetup() {
    this.isSetup = !this.isSetup;
  }
  toggleSettings() {
    this.isSetting = !this.isSetting;
  }

  toggleShowsidebar() {
    this.sidenavshow = !this.sidenavshow;
    if (!this.sidenavshow) {
      $('.sideNav').css('width', '82px');
      // $('.side-container').css('margin-left', '82px').slideLeft();
      $('.side-container').addClass('wl_82');
    }
    else {
      $('.sideNav').css('width', '250px');
      // $('.side-container').css('margin-left', '250px');
      $('.side-container').removeClass('wl_82');

    }
  }

  ShowsidebarMobNew() {
    this.sidenavshow = !this.sidenavshow;
    if (!this.sidenavshow) {
      $('.sideNav').css('width', '0px');
      // $('.side-container').css('margin-left', '82px').slideLeft();
      $('.side-container').addClass('0px');
    }
    else {
      $('.sideNav').css('width', '250px');
      // $('.side-container').css('margin-left', '250px');
      $('.side-container').removeClass('wl_82');

    }
  }

  ShowsidebarMob() {
    if (window.innerWidth <= 575) {
      $('.sideNav').css('width', '0');
      $('.side-container').css('margin-left', '0');
      $('.overlay').css('display', 'none');
    }
  }


  ngOnDestroy(): void {
  }
}
