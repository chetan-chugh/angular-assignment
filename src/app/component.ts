import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { VisitService } from './services/visit.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    @if (showNav) {
      <nav class="navbar">
      <div class="nav-inner">
        <span class="brand">Assessment</span>
        <div class="links">
          <a class="link" routerLink="/home" routerLinkActive="active">Home</a>
          @if (auth.isAdmin()) {
            <a class="link" routerLink="/summary" routerLinkActive="active">Summary</a>
          }
        </div>
        <span class="spacer"></span>
        <span class="user-chip">
          <span class="avatar">{{ auth.getCurrentUser()?.username?.charAt(0) }}</span>
          <span class="uname">{{ auth.getCurrentUser()?.username }}</span>
        </span>
        <button class="btn ghost" (click)="confirmingLogout = true">Logout</button>
      </div>
      </nav>
    }
    <main [class.container]="showNav">
      <router-outlet></router-outlet>
    </main>

    @if (confirmingLogout) {
      <div class="modal-backdrop" (click)="confirmingLogout = false">
        <div class="modal" role="dialog" aria-modal="true" (click)="$event.stopPropagation()">
          <h3>Logout?</h3>
          <p class="muted">Are you sure you want to logout?</p>
          <div class="modal-actions">
            <button class="btn cancel" (click)="confirmingLogout = false">Cancel</button>
            <button class="btn" (click)="confirmLogout()">Yes, logout</button>
          </div>
        </div>
      </div>
    }
  `
})
export class AppComponent {
  onLoginPage = false;
  confirmingLogout = false;   // true = show the logout popup

  confirmLogout() {
    this.confirmingLogout = false;
    this.auth.logout();
  }

  // navbar is only for logged in users and never on the login page
  get showNav(): boolean {
    return this.auth.isLoggedIn() && !this.onLoginPage;
  }

  constructor(public auth: AuthService, private router: Router, private visits: VisitService) {
    // every time the page changes, save the visit (service ignores non-members)
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.onLoginPage = event.urlAfterRedirects.startsWith('/login');
        this.visits.recordVisit(event.urlAfterRedirects);
      });
  }
}
