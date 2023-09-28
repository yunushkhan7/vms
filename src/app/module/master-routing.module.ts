import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterLayoutComponent } from '../core/layout/sidebar/master-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MasterLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/report',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'black-list',
        loadChildren: () => import('./black-list/black-list.module').then(m => m.BlackListModule),
      },
      {
        path: 'logs',
        loadChildren: () => import('./logs/logs.module').then(m => m.LogsModule),
      },
      {
        path: 'report',
        loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
      },
      {
        path: 'setup',
        loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'frsm-account',
        loadChildren: () => import('./frsm-module/frsm-account-management/frsm-account-management.module').then(m => m.FrsmAccountManagementModule),
      },

      {
        path: 'frsm-building',
        loadChildren: () => import('./frsm-module/frsm-building-management/frsm-building-management.module').then(m => m.FrsmBuildingManagementModule),
      },


      {
        path: 'frsm-company',
        loadChildren: () => import('./frsm-module/frsm-company-management/frsm-company-management.module').then(m => m.FrsmCompanyManagementModule),
      },

      {
        path: 'frsm-door',
        loadChildren: () => import('./frsm-module/frsm-door-management/frsm-door-management.module').then(m => m.FrsmDoorManagementModule),
      },

      {
        path: 'frsm-floor',
        loadChildren: () => import('./frsm-module/frsm-floor-management/frsm-floor-management.module').then(m => m.FrsmFloorManagementModule),
      },

      {
        path: 'frsm-io-trigger',
        loadChildren: () => import('./frsm-module/frsm-io-trigger-management/frsm-io-trigger-management.module').then(m => m.FrsmIoTriggerManagementModule),
      },

      {
        path: 'settings',
        loadChildren: () => import('./frsm-module/frsm-settings/frsm-settings.module').then(m => m.FrsmSettingsModule),
      },

      {
        path: 'frsm-investigation',
        loadChildren: () => import('./frsm-module/frsm-investigation/frsm-investigation.module').then(m => m.FrsmInvestigationModule),
      },

      {
        path: 'frsm-logs',
        loadChildren: () => import('./frsm-module/frsm-logs/frsm-logs.module').then(m => m.FrsmLogsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
