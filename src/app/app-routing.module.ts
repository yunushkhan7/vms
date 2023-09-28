import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRedirect } from './service/_guards/login-redirect.service';
import { EnsureAuthenticated } from './service/_guards/ensure-authenticated.service';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule),
    canActivate: [LoginRedirect]
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [LoginRedirect]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [LoginRedirect]
  },
  {
    path: 'reset-password/:TKN',
    loadChildren: () => import('./auth/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [LoginRedirect]

  },
  {
    path: 'verification',
    loadChildren: () => import('./auth/verify-opt/verify-opt.module').then(m => m.VerifyOptModule),
  },

  {
    path: '',
    loadChildren: () => import('./module/master.module').then(m => m.MasterModule),
    canActivate: [EnsureAuthenticated],
  },

  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
