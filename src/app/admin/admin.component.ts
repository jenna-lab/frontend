import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './../services/user-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  users: any[] = [];

  constructor(private router: Router, private userService: UserServiceService) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['login']);
    }
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    return !!token;
  };

  private fetchUsers(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService
        .getAllUsers(token)
        .then((users) => {
          this.users = users;
          console.log(this.users);
        })
        .catch((error) => {
          console.error('Error fetching users in component:', error);
        });
    }
  }

}
