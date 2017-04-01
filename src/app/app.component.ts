import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor() {

  }

  isAuthenticated() {
    return (localStorage.getItem('token') !== null);
  }

  isAdmin() {
    var isAdmin = false;
    var user = localStorage.getItem('user');

    if (user !== null) {
      isAdmin = (JSON.parse(user).role === 'admin');
    }

    return isAdmin;
  }
}
