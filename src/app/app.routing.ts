import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/';
import { WeatherComponent } from './weather/';
import { CameraComponent } from './camera/';
import { ApplicationsComponent } from './applications/';
import { UsersComponent } from './admin/';

import { AuthGuard, AdminGuard } from './_guards';

const appRoutes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'camera',
    component: CameraComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'apps',
    component: ApplicationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin/users',
    component: UsersComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin',
    redirectTo: 'admin/users'
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing = RouterModule.forRoot(appRoutes);