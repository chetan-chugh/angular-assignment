import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="card welcome">
      <span class="avatar lg">{{ auth.getCurrentUser()?.username?.charAt(0) }}</span>
      <div>
        <h2>Welcome, {{ auth.getCurrentUser()?.username }}!</h2>
        <p class="muted" style="margin:4px 0 8px">You are logged in as</p>
        <span [class]="'badge ' + auth.getCurrentUser()?.role">{{ auth.getCurrentUser()?.role }}</span>
      </div>
    </div>
  `
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
