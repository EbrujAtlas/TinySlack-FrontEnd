import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../Model/message';
import { Channel } from '../Model/channel';
import { Observable } from 'rxjs';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url = 'http://localhost:8080/tinyslack/';

  options = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded',
    ),
  };

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get(this.url + 'messages');
  }

  getMessagesFromChannel(channel: Channel): Observable<Message[] | any> {
    return this.http.get(
      this.url + 'channels/' + channel.channelName + '/messages',
    );
  }

  postMessage(messageContent: string, user: User, channel: Channel) {
    const body = {
      messageContent: messageContent,
      user: user,
      channel: channel,
    };
    return this.http.post(this.url + 'messages', body); // requete http envers bdd
  }
}
