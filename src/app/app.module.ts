import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContentComponent } from './home/content/content.component';
import { HomeComponent } from './home/home.component';
import { SchedlistComponent } from './schedlist/schedlist.component';
import { SchedlistContentComponent } from './schedlist/content/content.component';
import { MainRequestPageComponent } from './main-request-page/main-request-page.component';
import { MainRequestPageContentComponent } from './main-request-page/content/content.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeContentComponent,
    HomeComponent,
    SchedlistComponent,
    SchedlistContentComponent,
    MainRequestPageComponent,
    MainRequestPageContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
