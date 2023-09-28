import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-frsm-aside-nav',
  templateUrl: './frsm-aside-nav.component.html',
  styleUrls: ['./frsm-aside-nav.component.scss']
})
export class FrsmAsideNavComponent implements OnInit {


  active = 'Report';

  isShown: boolean=false;
  isShown2: boolean=false;
  sidenavshow: boolean=false;
  currentUser: any;
  permissionObject: any = null;
  color: string = '#333';
  toggled: boolean =false;
isSetup= false;
  constructor() {
  }

  ngOnInit() {
    this.isShown = true;
    this.isShown2 = true;
    this.sidenavshow = true;
  }


  toggleShow() {
    this.isShown = !this.isShown;
  }
  toggleSetup(){
    this.isSetup = !this.isSetup;
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
