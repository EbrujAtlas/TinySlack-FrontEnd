import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { ChannelService } from 'src/app/Service/channel.service';

@Component({
  selector: 'app-list-channel',
  templateUrl: './list-channel.component.html',
  styleUrls: ['./list-channel.component.css'],
})
export class ListChannelComponent {
  channels: Channels[] = [];

  constructor(private ch: ChannelService, private route: Router) {
    this.ch.getChannels().subscribe((data: any) => {
      // à chaque fois on va recevoir des donnees, on les mets dans notre tableau channels qui est de type CHannels( Model)
      this.channels = data;
    });
  }
}