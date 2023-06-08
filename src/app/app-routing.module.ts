import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationComponent } from './components/verification/verification.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule) },
  { path: 'admin', data: {state:  'admin'}, loadChildren: () => import('./modules/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
  { path: 'doctor', data: {state:  'doctor'}, loadChildren: () => import('./modules/doctor-dashboard/doctor-dashboard.module').then(m => m.DoctorDashboardModule) },
  { path: 'verification', component: VerificationComponent, data: {state:  'verification'} },
  { path: '**', pathMatch: 'full', component: NotFoundComponent, data: {state:  'not-found'} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
