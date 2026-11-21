import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="login-wrap">
      <div class="card login-card">
        <div>
          <h2>Welcome back</h2>
          <span class="muted">Sign in to continue</span>
        </div>

        <label class="field">Username
          <input type="text" placeholder="user1@localhost" [(ngModel)]="username" />
        </label>
        <label class="field">Password
          <div class="pw-wrap">
            <input [type]="showPassword ? 'text' : 'password'" placeholder="Your password" [(ngModel)]="password" (keyup.enter)="onLogin()" />
            <button type="button" class="eye" (click)="showPassword = !showPassword"
              [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
              @if (showPassword) {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/><path d="M3 3l18 18"/></svg>
              } @else {
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              }
            </button>
          </div>
        </label>

        @if (errorMessage) {
          <p class="error">{{ errorMessage }}</p>
        }

        <button class="btn" (click)="onLogin()">Login</button>

      </div>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  showPassword = false;   // eye button toggles this

  constructor(private auth: AuthService) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }
    const success = this.auth.login(this.username, this.password);
    if (!success) {
      this.errorMessage = 'Invalid username or password';
    }
  }
}
