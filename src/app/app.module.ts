import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { AuthModule } from './auth/auth.module';
import { LogoutPageComponent } from './auth/logout-page/logout-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutPageComponent,
    NotFoundPageComponent,
    HomePageComponent,
    MainFeedComponent,
    LogoutPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
