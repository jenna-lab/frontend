import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../services/user-service.service';
import { UserRegister } from '../interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  userData: UserRegister = {
    email: '',
    password: '',
    name: '',
  };
  pwd: {
    confirmPassword: string;
  } = {
    confirmPassword: '',
  };
  constructor(private router: Router, private api: UserServiceService) {}
  onSubmit() {
    if (this.userData.name.trim() === '') {
      alert('Name is required');
      return;
    }
    if (this.userData.email.trim() === '') {
      alert('email is required');
      return;
    }
    if (this.userData.password.trim() === '') {
      alert('password is required');
      return;
    }
    if (this.userData.password != this.pwd.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const userData = {
      name: this.userData.name,
      email: this.userData.email,
      password: this.userData.password,
      role: 'admin',
    };

    this.api.register(this.userData).then(
      (data) => {
        console.log(userData);
        alert('User registered successfully');
                // alert('Admin registered successfully');
        // this.router.navigate(['/login']);

      },
      (error) => {
        console.log(error);
        alert('User already exists');
      }
    );
  }
  navigateToLogin = () => {
    this.router.navigate(['/login']);
  };
}
