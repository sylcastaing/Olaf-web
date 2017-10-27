import { Routes } from '@angular/router';

import { AdminUsersComponent } from './admin-users/components/admin-users.component';
import { AdminGuard } from '../shared/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'users',
    component: AdminUsersComponent,
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
