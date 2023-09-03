import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Messages } from 'src/app/Model/messages';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent {
  message: Messages = {
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
  canalActuel!: Channels;

  constructor(
    private ms: MessageService,
    private ar: ActivatedRoute,
    private cs: ChannelService
  ) {
    let name = this.ar.snapshot.params['name']; // capture des parametres dans url
    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    this.cs.getChannelByName(name).subscribe((data: any) => {
      console.log(data);
      this.canalActuel = data;
    });
  }
  AddMessage() {
    this.ms
      .postMessage(this.message.messageContent, this.canalActuel)
      .subscribe((data) => {
        console.log(data);
      });
  }
}

// let tmp: Messages = {
//   messageId: this.message.messageId,
//   messageContent: this.message.messageContent,
//   messageDate: this.message.messageDate,
//   channel: {
//     channelId: this.message.channel.channelId,
//     channelName: this.message.channel.channelName,
//     description: this.message.channel.description,
//     protection: this.message.channel.protection,
//     creationDate: this.message.channel.creationDate,
//     user: {
//       userId: this.message.channel.user.userId,
//       password: this.message.channel.user.password,
//       userMail: this.message.channel.user.userMail,
//       userName: this.message.channel.user.userName,
//     },
//   },
//   user: {
//     userId: this.message.user.userId,
//     password: this.message.user.password,
//     userMail: this.message.user.userMail,
//     userName: this.message.user.userName,
//   },
// };
// console.log(tmp);
