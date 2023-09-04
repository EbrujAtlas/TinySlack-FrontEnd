import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../Model/messages';
import { Channels } from '../Model/channels';
import { Observable } from 'rxjs';
import { Users } from '../Model/users';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url = 'http://localhost:8080/tinyslack/';

  options = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get(this.url + 'messages');
  }

  getMessagesFromChannel(channel: Channels): Observable<Messages[] | any> {
    return this.http.get(
      this.url + 'channels/' + channel.channelName + '/messages'
    );
  }

  postMessage(messageContent: string, user: Users, channel: Channels) {
    const body = {
      messageContent: messageContent,
      user: user,
      channel: channel,
    };
    return this.http.post(this.url + 'messages', body);
  }

  patchMessage(message: Messages) {
    const body = {
      messageContent: message.messageContent,
      user: message.channel,
      channel: message.user,
    };
    return this.http.patch(this.url + 'messages/' + message.messageId, body);
  }

  deleteMessage(message: Messages) {
    return this.http.delete(this.url + 'messages/' + message.messageId);
  }
}