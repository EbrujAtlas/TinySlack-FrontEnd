import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Messages } from 'src/app/Model/messages';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  canal!: Channels;

  messagesFromChannel: Messages[] = [];

  constructor(
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private ms: MessageService
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