import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url = 'http://localhost:8080/tinyslack/';

  constructor(private http: HttpClient) {}

  getMessages() {
    return this.http.get(this.url + 'messages');
  }

  getMessageById(id: number) {
    return this.http.get(this.url + 'messages/' + id);
  }
}
