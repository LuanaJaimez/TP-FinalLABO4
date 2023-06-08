import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonModules } from './common-routing.module';
import { CommonModuleComponent } from './common.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CommonModuleComponent, 
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CommonModules,
  ],
  exports: [
    CommonModuleComponent,
    NavbarComponent,
  ],
  providers: []
})
export class SharedModule { }
