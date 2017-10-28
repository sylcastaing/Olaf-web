import { Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AdminUserComponent } from './admin-users/components/admin-user/admin-user.component';
import { AdminUsersComponent } from './admin-users/components/admin-users.component';

export const routes: Routes = [
  {
    path: 'users',
    component: AdminUsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'users/:id',
    component: AdminUserComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    redirectTo: 'users'
  },
  {
    path: '**',
    redirectTo: 'users'
  }
];
