import { Component, Input } from '@angular/core';
import { Message } from 'src/app/Model/message';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() msg: Message = {
    messageId: '',
    messageContent: '',
    messageDate: '',
    channel: {
      channelId: '',
      channelName: '',
      description: '',
      protection: 0,
      creationDate: new Date(2000 - 10 - 10),
      user: {
        userId: '',
        password: '',
        userMail: '',
        userName: '',
      },
    },
    user: {
      userId: '',
      password: '',
      userMail: '',
      userName: '',
    },
  };

  constructor(private ms: MessageService) {
    console.log(this.msg);
  }
}
