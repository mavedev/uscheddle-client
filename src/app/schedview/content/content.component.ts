import { environment } from './../../../environments/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-schedview-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ShedviewContentComponent implements OnInit, AfterViewInit {

  private readonly apiReadURL = `${environment.apiURI}/schedule`;

  private scheduleId: string;
  private userId: string;

  public isAbleToLoad = true;

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

  public ngAfterViewInit(): void {
    jexcel(document.getElementById('schedule-table'), {
      data: [[]],
      columns: [
        { type: 'dropdown', width: '100px', source: ['Y', 'N'] },
        { type: 'color', width: '100px', render: 'square' }
      ],
      minDimensions: [10, 10]
    });
  }

  private getScheduleData(): void {
    this.httpClient.get(
      `${this.apiReadURL}/${this.scheduleId}?senderId=${this.userId}`,
      { headers: { 'Content-Type': 'application/json' } }
    )
    .subscribe({
      next: (_: any) => {  },
      error: (_: any) => { this.isAbleToLoad = false; }
    });
  }

}
