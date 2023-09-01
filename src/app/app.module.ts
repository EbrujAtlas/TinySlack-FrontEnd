import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelComponent } from './component/channel/channel.component';
import { ListChannelComponent } from './component/list-channel/list-channel.component';
import { CreateChannelComponent } from './component/create-channel/create-channel.component';
import { MessageComponent } from './component/message/message.component';
import { CreateMessageComponent } from './component/create-message/create-message.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ChannelComponent,
    ListChannelComponent,
    CreateChannelComponent,
    MessageComponent,
    CreateMessageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
