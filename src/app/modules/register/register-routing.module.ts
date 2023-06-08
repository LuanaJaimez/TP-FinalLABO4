import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterHomeComponent } from './register-home/register-home.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { RegisterDoctorComponent } from './register-doctor/register-doctor.component';
import { AdminRegisterComponent } from '../admin-dashboard/admin-register/admin-register.component';

const routes: Routes = [
  { path: '', component: RegisterHomeComponent },
  { path: 'patient', component: RegisterPatientComponent },
  { path: 'doctor', component: RegisterDoctorComponent },
  { path: 'admin', component: AdminRegisterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
