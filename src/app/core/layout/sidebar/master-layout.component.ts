import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service';
import {AsideNavComponent } from '../../aside-nav/aside-nav.component';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit {

  subNavShow: boolean = false;
  brandTitle = "vms"
  navLink: any = [];
  sidenavshow: boolean=false;

  isCompanySelected: boolean = false;
  currentUser: any;
   sideNavBarType:any;
  constructor(
    private router: Router,
    private dataService: DataService,
    private dataservice: DataService
  ) {
    this.dataservice.currentUser.subscribe((res => {
      if (res) {
        this.currentUser = res
      }
    }))

 
  }

  ngOnInit() {
    this.sidenavshow = true;
    // this.sideNavBarType=sessionStorage.getItem('_auth_ecom')
  }


  onLanguageChange(): void {
  //  sessionStorage.setItem('currentLanguage', this.activeLang);
    window.location.reload();
  }
  ShowsidebarMob() {
    // this.sidenavshow = !this.sidenavshow;
    if ($('.sideNav').css('width') == '0px') {
      $('.sideNav').css('width', '250px');
      $('.overlay').css('display', 'block');
    }
    else {
      $('.sideNav').css('width', '0px');
      $('.overlay').css('display', 'none');
    }
  }

  onLogOut() {
    this.dataService.purgeAuth();
    this.dataservice.callLogoutMethod();
    this.router.navigateByUrl('/login');
  }
  ngOnDestroy(): void { }
}
