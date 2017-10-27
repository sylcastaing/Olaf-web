import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersComponent } from './components/admin-users.component';
import { SharedModule } from '../../shared/shared.module';
import { OlafMaterialModule } from '../../olaf-material/olaf-material.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OlafMaterialModule
  ],
  declarations: [
    AdminUsersComponent
  ]
})
export class AdminUsersModule { }
