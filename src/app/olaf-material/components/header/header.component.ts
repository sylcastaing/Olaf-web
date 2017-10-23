import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Output()
  public toggleMenu = new EventEmitter<void>();

  constructor(public authService: AuthService) {
  }

  /**
   * Change Password
   */
  changePassword() {

  }


}
