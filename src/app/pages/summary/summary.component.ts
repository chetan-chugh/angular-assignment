import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="page-head">
      <h2>Summary</h2>
      <span class="muted">Page visits by members</span>
    </div>

    <div class="card table-wrap">
      <table>
        <thead>
          <tr><th>User</th><th>Visits</th><th>Visit times</th></tr>
        </thead>
        <tbody>
          @for (row of summary; track row.username) {
            <tr>
              <td>
                <div class="user-cell">
                  <span class="avatar sm">{{ row.username.charAt(0) }}</span>{{ row.username }}
                </div>
              </td>
              <td data-label="Visits"><span class="count">{{ row.count }}</span></td>
              <td data-label="Visit times">
                @if (row.times.length === 0) {
                  <span class="empty">No visits yet</span>
                }
                <div class="chips">
                  @for (t of row.times; track $index) {
                    <span class="chip">{{ t | date: 'medium' }}</span>
                  }
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `
})
export class SummaryComponent implements OnInit {
  summary: { username: string; count: number; times: string[] }[] = [];

  constructor(private visitService: VisitService) {}

  ngOnInit() {
    this.summary = this.visitService.getSummary();
  }
}
