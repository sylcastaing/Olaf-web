import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OlafMaterialModule } from '../../olaf-material/olaf-material.module';
import { SharedModule } from '../../shared/shared.module';
import { AdminUserComponent } from './components/admin-user/admin-user.component';
import { AdminUsersComponent } from './components/admin-users.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OlafMaterialModule,
    RouterModule
  ],
  declarations: [
    AdminUsersComponent,
    AdminUserComponent
  ]
})
export class AdminUsersModule { }
