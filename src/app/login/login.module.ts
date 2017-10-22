import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    OlafMaterialModule
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule {
}
