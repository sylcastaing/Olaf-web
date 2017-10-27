import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { WeatherComponent } from './weather/components/weather.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { ApplicationsComponent } from './applications/components/applications.component';
import { CameraComponent } from './camera/components/camera.component';

export const routes: Routes = [
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
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
