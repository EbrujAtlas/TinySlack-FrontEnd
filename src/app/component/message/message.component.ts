import { Component, Input } from '@angular/core';
import { Messages } from 'src/app/Model/messages';
import { Users } from 'src/app/Model/users';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

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

  currentUser!: Users;
  displayForm: boolean = false;

  constructor(private ms: MessageService, private us: UserService) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

  onDisplayForm() {
    this.displayForm = true;
  }

  delete() {
    this.ms.deleteMessage(this.msg).subscribe((response) => {
      console.log(response);
    });
    alert('Message supprimé');
  }
}