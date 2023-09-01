import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Messages } from 'src/app/Model/messages';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';

const messageInt: Messages = {
  messageId: '',
  message: '',
  messageDate: new Date(2020 - 10 - 10),
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
@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  canal: Channels = {
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
  };

  allMessages: Messages[] = [
    // {
    //   messageId: '',
    //   message: '',
    //   messageDate: new Date(2020-10-10),
    //   channel: {
    //     channelId: '',
    //     channelName: '',
    //     description: '',
    //     protection: 0,
    //     creationDate: new Date(2000-10-10),
    //     user: {
    //       userId: '',
    //       password: '',
    //       userMail: '',
    //       userName: '',
    //     }
    //   },
    //   user: {
    //     userId: '',
    //     password: '',
    //     userMail: '',
    //     userName: '',
    //   }
    // },
  ];
  messagesFromChannel: Messages[] = [];

  constructor(
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private ms: MessageService
  ) {
    let name = this.ar.snapshot.params['name'];

    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    if (name != undefined) {
      this.cs.getChannelByName(name).subscribe((data: any) => {
        console.log(data);
        this.canal = data;
      });
    }

    // récupérer l'ID du channel
    let idFromChannel = this.canal.channelId;

    console.log(this.canal)
    console.log('Nom du canal');
    console.log(this.canal.channelName);
    console.log('============');
    console.log('Id du canal');
    console.log(idFromChannel);

    this.ms.getMessages().subscribe((data: any) => {
      this.allMessages.push(...data);
      console.log('On récupère tous les messages');
      console.log(this.allMessages);

      console.log('On les affiche un par un');
      this.allMessages.forEach((x) => {
        console.log(x);
        console.log('==================');
        // if (x.channel.channelId == idFromChannel) {
        //   this.messagesFromChannel.push(x);
        // }
      });
    });
  }
}
