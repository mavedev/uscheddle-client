import { Component, OnInit } from '@angular/core';
import $ from 'jquery';
import 'datatables';

@Component({
  selector: 'app-schedlist-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('.dt-schedules').DataTable();
    $('.dataTables_length').addClass('bs-select');
  }

}
