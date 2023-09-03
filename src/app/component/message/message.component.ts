import { Component, Input } from '@angular/core';
import { Messages } from 'src/app/Model/messages';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() msg: Messages = {
    messageId: '',
    messageContent: '',
    messageDate: '',
    channel: {
      channelId: '',
      channelName: '',
      channelDescription: '',
      locked: 0,
      creationDate: new Date(),
      user: {
        userId: '',
        password: '',
        userMail: '',
        userName: '',
      }
    },
    user: {
      userId: '',
      password: '',
      userMail: '',
      userName: '',
    } 
  };

  constructor(private ms: MessageService) {
    console.log(this.msg)
  }
}