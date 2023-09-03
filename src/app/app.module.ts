import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ChannelComponent } from './component/channel/channel.component';
import { ListChannelComponent } from './component/list-channel/list-channel.component';
import { CreateChannelComponent } from './component/create-channel/create-channel.component';
import { MessageComponent } from './component/message/message.component';
import { CreateMessageComponent } from './component/create-message/create-message.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { ProfileComponent } from './component/profile/profile.component';
import { Error404Component } from './component/error404/error404.component';
import { AboutComponent } from './component/about/about.component';
import { DeleteChannelComponent } from './component/delete-channel/delete-channel.component';
import { DeleteMessageComponent } from './component/delete-message/delete-message.component';
import { ChangeChannelComponent } from './component/change-channel/change-channel.component';
import { ChangeMessageComponent } from './component/change-message/change-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    ListChannelComponent,
    CreateChannelComponent,
    MessageComponent,
    CreateMessageComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    Error404Component,
    AboutComponent,
    DeleteChannelComponent,
    DeleteMessageComponent,
    ChangeChannelComponent,
    ChangeMessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}