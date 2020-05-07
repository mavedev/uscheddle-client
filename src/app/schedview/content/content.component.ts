import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-schedview-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ShedviewContentComponent implements OnInit {

  private scheduleId: string;
  private userId: string;

  public constructor(
    private route: ActivatedRoute,
    private authService: MsalService
  ) { }

  public ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.userId = this.authService.getAccount().accountIdentifier || '';
  }

}
