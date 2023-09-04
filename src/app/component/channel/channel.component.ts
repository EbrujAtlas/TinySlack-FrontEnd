import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { Message } from 'src/app/Model/message';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  canal!: Channel;

  messagesFromChannel: Message[] = [];

  constructor(
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private ms: MessageService,
  ) {
    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    let name = this.ar.snapshot.params['name'];
    this.cs.getChannelByName(name).subscribe((data: any) => {
      console.log(data);
      this.canal = data;

      //récupérer les messages liés à ce canal
      this.ms.getMessagesFromChannel(this.canal).subscribe((messagesList) => {
        console.log(messagesList);
        this.messagesFromChannel = messagesList;
      });
    });
  }
}
