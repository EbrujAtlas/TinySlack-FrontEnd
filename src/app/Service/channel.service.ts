import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Channel } from '../Model/channel';
import { User } from '../Model/user';

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
  postChannel(channel: Channel, user: User) {
    const body = {
      channelName: channel.channelName,
      channelDescription: channel.channelDescription,
      user: user,
      locked: 0,
    };
    return this.http.post(this.url + 'channels', body);
  }

  // modifier un canal existant en BDD
  patchChannel(channel: Channel) {
    const body = {
      channelId: channel.channelId,
      channelName: channel.channelName,
      channelDescription: channel.channelDescription,
      user: channel.user,
    };
    return this.http.patch(this.url + 'channels/' + channel.channelName, body);
  }

  // supprimer un canal existant en BDD
  deleteChannel(channel: Channel) {
    return this.http.delete(this.url + 'channels/' + channel.channelName);
  }
}
