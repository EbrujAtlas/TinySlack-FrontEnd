import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChannelComponent } from './component/channel/channel.component';

import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProfileComponent } from './component/profile/profile.component';
import { Error404Component } from './component/error404/error404.component';
import { AboutComponent } from './component/about/about.component';
import { CreateChannelComponent } from './component/create-channel/create-channel.component';
import { ChannelViewComponent } from './component/channel-view/channel-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'channel/:name', component: ChannelViewComponent },
  { path: 'newchannel', component: CreateChannelComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}