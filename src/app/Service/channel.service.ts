import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  url = 'http://localhost:8080/tinyslack/';

  constructor(private http: HttpClient) {}

  getChannels() {
    return this.http.get(this.url + 'channels');
  }
}
