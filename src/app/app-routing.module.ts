import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { LogoutPageComponent } from './auth/logout-page/logout-page.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent,
    canLoad: [AuthGuard]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'logout', component: LogoutPageComponent },
      { path: '', component: MainFeedComponent }
    ]
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
