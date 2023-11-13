import { Component } from '@angular/core';
import { UserLogin } from '../interfaces/user';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userData: UserLogin = {
    email: '',
    password: '',
  };

  constructor(private router: Router, private api: UserServiceService) {}
  onSubmit() {
    if (this.userData.email.trim() === '') {
      alert('email is required');
      return;
    }
    if (this.userData.password.trim() === '') {
      alert('password is required');
      return;
    }

    const userData = {
      email: this.userData.email,
      password: this.userData.password,
    };

    this.api.login(this.userData).then(
      (data) => {
        localStorage.setItem('token', data.token);
        // console.log(data);
        try {
          this.api.checkUserDetails(data.token).then((data) => {
            // console.log(data);
            if (data.role === 'user') {
              localStorage.setItem('name', data.name);
              this.router.navigate(['/user']);
            }
            if (data.role === 'admin') {
              localStorage.setItem('name', data.name);
              this.router.navigate(['/admin']);
            }
          });
        } catch (error) {
          console.log(error);

        }

    
      },
      (error) => {
        console.log(error);
        alert('User already exists');
      }
    );
  }
  navigateToRegister = () => {
    this.router.navigate(['/register']);
  };
}
