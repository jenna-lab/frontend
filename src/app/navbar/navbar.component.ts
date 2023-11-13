import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private router: Router) {}
  showMenu = false;
  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  logOutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    this.router.navigate(['/login']);
  };

  name = localStorage.getItem('name');


}
