import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {
  MatButtonModule,
  MatCardModule, MatIconModule, MatInputModule, MatMenuModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { NavElementComponent } from './components/nav/nav-element/nav-element.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    NavElementComponent
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSnackBarModule,
    MatToolbarModule
  ]
})
export class OlafMaterialModule {
}
