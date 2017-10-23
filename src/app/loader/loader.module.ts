import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';

@NgModule({
  imports: [
    CommonModule,
    OlafMaterialModule
  ],
  declarations: [
    LoaderComponent
  ],
  providers: [
    LoaderService
  ],
  exports: [
    LoaderComponent
  ]
})
export class LoaderModule { }
