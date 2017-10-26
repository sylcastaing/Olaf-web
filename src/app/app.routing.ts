import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { WeatherComponent } from './weather/components/weather.component';
import { AuthGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
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
