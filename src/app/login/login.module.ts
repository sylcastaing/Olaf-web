import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
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
