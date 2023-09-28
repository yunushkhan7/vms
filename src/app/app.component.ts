import { Component, OnInit, Renderer2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter, map } from 'rxjs/operators';
import { DataService } from './service/data.service';
import { UserService } from './service/user.service';
import { APP_NAME } from './shared/messages';
import { Location } from '@angular/common';
import { ChangePasswordComponentPopup } from './core/change-password-popup/change-password-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { JwtService } from './service/jwt.service';
import { ActionPopupComponent } from './core/action-popup/action-popup.component';
import { CommonService } from './service/common.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vms';

  customConfig: any;
  isAuthenticated: boolean;
  previousUrl: string;
  currentUser: any;
  isRootPage: any;
  permissionObject: any = [];
  isLoader = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private _userService: UserService,
    private titleService: Title,
    private meta: Meta,
    private dataService: DataService,
    public dialog: MatDialog,
    private location: Location,
    private jwtService: JwtService,
    private commonservice: CommonService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.previousUrl) {
          this.renderer.removeClass(document.body, this.previousUrl);
        }
        const currentUrlSlug = event.url.slice(1);
        if (currentUrlSlug) {
          this.renderer.addClass(document.body, currentUrlSlug);
        }
        this.previousUrl = currentUrlSlug;
      }
    });

    if (this.jwtService.getToken()) {
        this.getCurrentUser();
    }
    commonservice.idle$.subscribe(s => {
      console.log('im idle, zzz')
      // this.getreauthenticate();
    });
    commonservice.wake$.subscribe(s =>  {
      this.onLogOut()
      //  this.getreauthenticate();
    });
    this.dataService.isAuthenticated.subscribe((isLoggedIn) => {
      this.isAuthenticated = isLoggedIn;
    });
    this.dataService.permission.subscribe((response) => {
      response && response.length > 0 ? this.permissionObject = response : '';
    });
    this.globalRouterEvents();
  }

  ngOnInit() { }


  onLogOut() {
    this.dataService.purgeAuth();
    const dialogRef = this.dialog.open(ActionPopupComponent, {
      width: '530px',
      height: '320px',
      data: { isSessionTimeOut: true },
      panelClass: 'timeout',
      disableClose: true,
    });
    this.router.navigateByUrl('/login');
  }
  
  globalRouterEvents(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
    ).subscribe(() => {
      const rt = this.getChild(this.activatedRoute);
      rt.data.subscribe(data => {
        this.isRootPage = data && data.isRootPage;
        const title = data && data.title;
        const tags = data && data.tags;

        if (title) { this.titleService.setTitle(`${title} | ${APP_NAME}`); }
        if (tags) { tags.forEach((tag) => { this.meta.updateTag(tag); }); }
        //  check the Permission
        this.dataService.permission.subscribe((response: any) => {
          let role = response?.permissions;
          if (role && data['module'] && data['action']) {
            const checkPerms = role[data['module']] ? role[data['module']][data['action']] : false;
            if (!checkPerms) {
              this.location.back()
              return;
            }
          }
        });
      });
    });
  }

  getChild(activatedRoute: ActivatedRoute) {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  getCurrentUser(): void {
    this.isLoader=true
    this._userService.getCurrentUser({}).subscribe((response: any) => {
      if (response) {
        // this._userService.currentUserSubject.next(response?.user);
        this.dataService.setAuth(response);
        this.isLoader=false
        // if (response.user.isFirstTimeLogin) {
        //   this.dialog.open(ChangePasswordComponentPopup, {
        //     disableClose: true,
        //     data: response,
        //     panelClass: 'delete-popup'
        //   });
        // }
      } else {
        this.isLoader=false
      }
    }, (error) => {
      //  this.toastr.error(error.error.message);
      this.dataService.purgeAuth();
      window.location.reload();
      this.isLoader=false
    });
  }

  ngOnDestroy() { }
}
