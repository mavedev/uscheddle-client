import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  isAuthentified = true;

  constructor(private authService: MsalService) { }

  ngOnInit(): void {
  }

  logout($event): void {
    this.authService.logout();
  }

}
