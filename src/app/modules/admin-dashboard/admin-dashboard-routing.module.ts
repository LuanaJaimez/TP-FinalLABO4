import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from 'src/app/components/not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: AdminDashboardComponent,children:[
    {path:'register-admin',component:AdminRegisterComponent, data: {state:  'register-admin'}},
  ]},
  { path: '**', pathMatch: 'full', component: NotFoundComponent, data: {state:  'not-found'} }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule { }
