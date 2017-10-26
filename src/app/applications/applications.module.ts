import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsComponent } from './components/applications.component';
import { ApplicationComponent } from './components/application/application.component';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OlafMaterialModule
  ],
  declarations: [
    ApplicationsComponent,
    ApplicationComponent
  ]
})
export class ApplicationsModule {
}
