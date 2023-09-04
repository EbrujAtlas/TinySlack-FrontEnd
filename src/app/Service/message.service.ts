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

  // récupérer tous les messages en BDD
  getMessages() {
    return this.http.get(this.url + 'messages');
  }

  // récupérer tous les messages d'un canal
  getMessagesFromChannel(channel: Channel): Observable<Message[] | any> {
    return this.http.get(
      this.url + 'channels/' + channel.channelName + '/messages',
    );
  }

  // ajouter un nouveau message en BDD
  postMessage(messageContent: string, user: User, channel: Channel) {
    const body = {
      messageContent: messageContent,
      user: user,
      channel: channel,
    };
    return this.http.post(this.url + 'messages', body);
  }

  // modifier un message existant en BDD
  patchMessage(message: Message) {
    const body = {
      messageId: message.messageId,
      messageContent: message.messageContent,
      messageDate: message.messageDate,
      user: message.user,
      channel: message.channel,
    };
    return this.http.patch(this.url + 'messages/' + message.messageId, body);
  }

  // supprimer un message existant en BDD
  deleteMessage(message: Message) {
    return this.http.delete(this.url + 'messages/' + message.messageId);
  }
}