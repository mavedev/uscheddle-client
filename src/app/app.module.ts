import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MsalModule } from '@azure/msal-angular';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeContentComponent } from './home/content/content.component';
import { HomeComponent } from './home/home.component';
import { SchedlistComponent } from './schedlist/schedlist.component';
import { SchedlistContentComponent } from './schedlist/content/content.component';
import { MainRequestPageComponent } from './main-request-page/main-request-page.component';
import { MainRequestPageContentComponent } from './main-request-page/content/content.component';
import { SchedviewComponent } from './schedview/schedview.component';
import { ShedviewContentComponent } from './schedview/content/content.component';
import { SearchlistComponent } from './searchlist/searchlist.component';
import { SearchlistContentComponent } from './searchlist/content/content.component';

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
    MainRequestPageContentComponent,
    SchedviewComponent,
    ShedviewContentComponent,
    SearchlistComponent,
    SearchlistContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot({
      auth: {
          clientId: environment.appMSALClientLID,
          authority: 'https://login.microsoftonline.com/common',
          redirectUri: `${environment.appURI}/schedlist`,
          postLogoutRedirectUri: environment.appURI
      }
    }, {
      consentScopes: ['https://graph.microsoft.com/User.ReadWrite']
    }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
