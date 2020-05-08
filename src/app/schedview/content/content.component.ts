import { environment } from './../../../environments/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

declare const jexcel: any;

@Component({
  selector: 'app-schedview-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ShedviewContentComponent implements OnInit {

  private readonly apiReadURL = `${environment.apiURI}/schedule`;
  private readonly columns = [
      { type: 'text', title: 'Time', width: 120 },
      { type: 'text', title: 'Course', width: 120 },
      { type: 'text', title: 'Instructor', width: 120 },
      { type: 'text', title: 'Group', width: 120 },
      { type: 'text', title: 'Weeks', width: 120 },
      { type: 'text', title: 'Classroom', width: 120 },
  ];

  private scheduleId: string;
  private userId: string;
  private tables: any[] = [];

  public scheduleName = '';
  public isAbleToLoad = true;
  public isAbleToEdit = false;

  public constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private authService: MsalService
  ) { }

  public ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.userId = this.authService.getAccount().accountIdentifier || '';
    this.getScheduleData();
  }

  private fillTables(scheduleData: any): void {
    this.scheduleName = scheduleData.name;
    this.isAbleToEdit = scheduleData.editable;
    [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ].forEach(day => {
      const table = jexcel(document.getElementById(day.toLowerCase()), {
        data: scheduleData[day.toLowerCase()],
        columns: this.columns,
        nestedHeaders: [{ title: day, colspan: 6 }]
      });
      table.hideIndex();
      this.tables.push({ [day]: table });
    });
  }

  private getScheduleData(): void {
    this.httpClient.get(
      `${this.apiReadURL}/${this.scheduleId}?senderId=${this.userId}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
    .subscribe({
      next: (scheduleData: any) => { this.fillTables(scheduleData); },
      error: (_: any) => { this.isAbleToLoad = false; }
    });
  }

}
