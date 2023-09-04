import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { ChannelService } from 'src/app/Service/channel.service';

@Component({
  selector: 'app-list-channel',
  templateUrl: './list-channel.component.html',
  styleUrls: ['./list-channel.component.css'],
})
export class ListChannelComponent {
  channels: Channel[] = [];

  constructor(
    private cs: ChannelService,
    private route: Router,
  ) {
    // récupérer tous les canaux en BDD
    this.cs.getChannels().subscribe((data: any) => {
      this.channels = data;
    });
  }

  onClick() {
    this.route.navigate(['/newchannel']);
  }
}
