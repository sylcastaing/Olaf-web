import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { WeatherComponent } from './weather/components/weather.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ApplicationsComponent } from './applications/components/applications.component';

export const routes: Routes = [
  {
    path: '',
    component: WeatherComponent,
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
    path: '**',
    redirectTo: ''
  }
];
