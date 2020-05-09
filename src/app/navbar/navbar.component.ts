import { Router } from '@angular/router';
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
  public scheduleName: string;

  public constructor(
    private router: Router,
    private authService: MsalService
  ) { }

  public ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
  }

  public search(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => {
        this.router.navigate(['searchlist'], { queryParams: { schedule: this.scheduleName } });
    });
  }

}
