import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';
import { CameraComponent } from './components/camera.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OlafMaterialModule
  ],
  declarations: [
    CameraComponent
  ]
})
export class CameraModule { }
