import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PrivateRoutingModule } from './private-routing.module';
import { MainFeedComponent } from './main-feed/main-feed.component';
import { ProfileComponent } from './profile/profile.component';
import { PostsByComponent } from './posts-by/posts-by.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    MainFeedComponent,
    PostComponent,
    PostsByComponent,
    ProfileComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrivateRoutingModule
  ]
})
export class PrivateModule { }
