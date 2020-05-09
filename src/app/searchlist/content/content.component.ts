import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables';

@Component({
  selector: 'app-searchlist-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class SearchlistContentComponent implements OnInit {

  private readonly apiGetByOwnerUrl = `${environment.apiURI}/search`;
  private table: any;

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService,
    private route: ActivatedRoute,
  ) { }

  private getUserId(): string {
    return this.authService.getAccount().accountIdentifier;
  }

  private loadIds(scheduleName: string): void {
    this.httpClient.get(
      this.apiGetByOwnerUrl,
      {
        headers: { 'access-token': this.getUserId() },
        params: { name: scheduleName }
      }
    ).subscribe({
      next: (idsNamesPairs: any[]) => {
        idsNamesPairs.forEach(value => {
          const {id, name} = value;
          this.table.row.add([`<a href="schedview/${id}">${name}</a>`]).draw();
        });
      },
      error: _ => { }
    });
  }

  public ngOnInit(): void {
    const scheduleName = this.route.snapshot.queryParamMap.get('schedule');
    // JQuery needed to use datatables with MDBootstrap.
    // FIXME: remove JQuery at the next version.
    this.table = $('.dt-schedules').DataTable();
    $('.dataTables_length').addClass('bs-select');
    this.loadIds(scheduleName);
  }

}
