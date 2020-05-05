import { Component, OnInit } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-schedview-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ShedviewContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#t1').SetEditable();
  }

}
