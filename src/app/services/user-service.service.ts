import { Injectable } from '@angular/core';
import { UserLogin, UserRegister } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  userUrl = 'http://localhost:8000/user';

  constructor() {}

  async register(userData: UserRegister) {
    const response = await fetch(`${this.userUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    console.log(response);

    return response.json();
  }

  async login(userData: UserLogin) {
    const response = await fetch(`${this.userUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    // console.log(response.json());

    return response.json();
  }
  async checkUserDetails(token: string) {
    const response = await fetch(`${this.userUrl}/check`, {
      method: 'GET',
      headers: {
        token: token,
      },
    });
    return response.json();
  }

  async getAllUsers(token: string) {
    try {
      const response = await fetch(`${this.userUrl}/users`, {
        method: 'GET',
        headers: {
          token: token,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users. Status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
}


