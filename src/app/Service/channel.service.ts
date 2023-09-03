import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Channels } from '../Model/channels';
import { Users } from '../Model/users';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  url = 'http://localhost:8080/tinyslack/';

  options = {
    headers: new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    ),
  };
  
  constructor(private http: HttpClient) {}

  // récupérer tous les canaux en BDD
  getChannels() {
    return this.http.get(this.url + 'channels');
  }

  // récupérer un canal en BDD par son nom
  getChannelByName(name: string) {
    return this.http.get(this.url + 'channels/' + name);
  }

  // ajouter un nouveau canal en BDD
  postChannel(channel: Channels, user: Users) {
    const body = {
      channelName: channel.channelName,
      channelDescription: channel.description,
      user: user
    };
    return this.http.post(this.url + 'channels', body);
  }
}