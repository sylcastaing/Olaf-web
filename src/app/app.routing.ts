import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/';
import { WeatherComponent } from './weather/';

import { AuthGuard } from './_guards';

const appRoutes: Routes = [
  {
    path: '',
    component: WeatherComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export const routing = RouterModule.forRoot(appRoutes);