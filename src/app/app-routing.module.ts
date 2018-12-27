import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './about-page/about-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthGuard } from './auth/auth.guard';
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
  { //TODO check this
    path: 'logout', 
    component: LogoutPageComponent 
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
