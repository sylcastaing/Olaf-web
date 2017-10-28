import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { RouterModule } from '@angular/router';
import { routes } from './admin.routing';

@NgModule({
  imports: [
    CommonModule,
    AdminUsersModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
