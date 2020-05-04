import { Component, OnInit } from '@angular/core';
import $ from 'jquery'; // For MDBootstrap + datatables.
import 'datatables';

// declare const $: any;

@Component({
  selector: 'app-schedlist-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  names: Array<string> = ['A', 'B', 'f'];

  constructor() { }

  ngOnInit(): void {
    // JQuery needed to use datatables with MDBootstrap.
    // FIXME: remove JQuery at the next version.
    const table: any = $('.dt-schedules').DataTable();
    $('.dataTables_length').addClass('bs-select');

    this.names.forEach(value => {
      table.row.add(value).draw();
    });
  }

}
