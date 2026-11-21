import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Visit } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class VisitService {
  private visitsKey = 'visits';

  constructor(private auth: AuthService) {}

  private getVisits(): Visit[] {
    return JSON.parse(localStorage.getItem(this.visitsKey) || '[]');
  }

  // Called on every page change. Only "member" visits are saved.
  recordVisit(page: string): void {
    if (!this.auth.isMember()) {
      return;
    }
    const visits = this.getVisits();
    visits.push({
      username: this.auth.getCurrentUser()!.username,
      page: page,
      time: new Date().toISOString()
    });
    localStorage.setItem(this.visitsKey, JSON.stringify(visits));
  }

  // For the summary page: one row per member with count + all visit times
  getSummary() {
    const visits = this.getVisits();
    const members = this.auth.getAllUsers().filter(u => u.role === 'member');

    return members.map(member => {
      const myVisits = visits.filter(v => v.username === member.username);
      return {
        username: member.username,
        count: myVisits.length,
        times: myVisits.map(v => v.time)
      };
    });
  }
}
