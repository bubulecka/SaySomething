import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { PostsByComponent } from './posts-by/posts-by.component';


const routes: Routes = [
  {
    path: '',
    component: MainFeedComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'user/:id', component: PostsByComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
