import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchedlistComponent } from './schedlist/schedlist.component';
import { SchedviewComponent } from './schedview/schedview.component';
import { MainRequestPageComponent } from './main-request-page/main-request-page.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'schedlist',
    component: SchedlistComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'schedview',
    component: SchedviewComponent,
    canActivate: [
      MsalGuard
    ]
  },
  {
    path: 'main-request',
    component: MainRequestPageComponent,
    canActivate: [
      MsalGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
