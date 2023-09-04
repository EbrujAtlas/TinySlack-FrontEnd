import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Message } from 'src/app/Model/message';
import { User } from 'src/app/Model/user';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
})
export class MessageComponent {
  @Input() msg: Message = {
    messageId: '',
    messageContent: '',
    messageDate: new Date(),
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
      },
    },
    user: {
      userId: '',
      password: '',
      userMail: '',
      userName: '',
    },
  };

  currentUser!: User;
  displayForm: boolean = false;
  @Output() Rafraichissement = new EventEmitter();
  constructor(private ms: MessageService, private us: UserService) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

  delete() {
    this.ms.deleteMessage(this.msg).subscribe((response) => {
      console.log(response);
    });
    this.raffraichissement();
  }
  raffraichissement() {
    this.Rafraichissement.emit();
  }
}
