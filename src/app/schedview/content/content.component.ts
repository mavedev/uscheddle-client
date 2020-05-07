import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-schedview-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ShedviewContentComponent implements OnInit {

  private scheduleId: string;
  private userId: string;

  public constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.scheduleId = this.route.snapshot.paramMap.get('id');
    this.userId = this.getUserId();
    alert([this.scheduleId, this.userId]);
  }

  private getUserId(): string {
    return 'dummyUser';
  }

}
