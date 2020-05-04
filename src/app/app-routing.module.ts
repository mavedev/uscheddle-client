import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SchedlistComponent } from './schedlist/schedlist.component';
import { SchedviewComponent } from './schedview/schedview.component';
import { MainRequestPageComponent } from './main-request-page/main-request-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'schedlist', component: SchedlistComponent },
  { path: 'schedview', component: SchedviewComponent },
  { path: 'main-request', component: MainRequestPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
