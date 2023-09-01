import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Messages } from '../Model/messages';
import { Channels } from '../Model/channels';
import { Observable } from 'rxjs';

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
    return this.http.get(this.url + 'channels/' + channel.channelName + '/messages')
  }
}