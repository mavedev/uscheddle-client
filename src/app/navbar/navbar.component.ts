import { Component, OnInit, Input } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input()
  public isAuthentified = true;

  public constructor(private authService: MsalService) { }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

}
