import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private usersKey = 'users';
  private currentUserKey = 'currentUser';

  constructor(private router: Router) {
    this.createDefaultUsers();
  }

  // Put the 3 users in local storage the first time the app runs
  private createDefaultUsers(): void {
    if (localStorage.getItem(this.usersKey)) {
      return;
    }
    const users: User[] = [
      { username: 'user1@localhost', password: 'user1@12345678', role: 'member' },
      { username: 'user2@localhost', password: 'user2@12345678', role: 'member' },
      { username: 'admin1@localhost', password: 'admin1@87651234', role: 'admin' }
    ];
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem(this.usersKey) || '[]');
  }

  // returns true if login worked, false if username/password is wrong
  login(username: string, password: string): boolean {
    const user = this.getAllUsers().find(
      u => u.username === username && u.password === password
    );
    if (!user) {
      return false;
    }
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
    this.router.navigate(['/home']);
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    const data = localStorage.getItem(this.currentUserKey);
    return data ? JSON.parse(data) : null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    return this.getCurrentUser()?.role === 'admin';
  }

  isMember(): boolean {
    return this.getCurrentUser()?.role === 'member';
  }
}
