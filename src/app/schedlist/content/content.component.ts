import { MsalService } from '@azure/msal-angular';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import $ from 'jquery';
import 'datatables';

@Component({
  selector: 'app-schedlist-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class SchedlistContentComponent implements OnInit {

  private readonly apiGetByOwnerUrl = `${environment.apiURI}/schedules`;
  private table: any;

  constructor(
    private httpClient: HttpClient,
    private authService: MsalService
  ) { }

  private getUserId(): string {
    return this.authService.getAccount().accountIdentifier;
  }

  private loadIds(): void {
    this.httpClient.get(
      this.apiGetByOwnerUrl,
      {
        headers: { 'access-token': this.getUserId() }
      }
    ).subscribe({
      next: (ids: string[]) => {
        ids.forEach(value => {
          this.table.row.add([`<a href="schedview/${value}">link</a>`]).draw();
        });
      },
      error: _ => { }
    });
  }

  public ngOnInit(): void {
    // JQuery needed to use datatables with MDBootstrap.
    // FIXME: remove JQuery at the next version.
    this.table = $('.dt-schedules').DataTable();
    $('.dataTables_length').addClass('bs-select');
    this.loadIds();
  }

}
