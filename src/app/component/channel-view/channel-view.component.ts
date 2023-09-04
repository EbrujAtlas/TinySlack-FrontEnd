import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { Message } from 'src/app/Model/message';
import { User } from 'src/app/Model/user';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-channel-view',
  templateUrl: './channel-view.component.html',
  styleUrls: ['./channel-view.component.css'],
})
export class ChannelViewComponent {
  canal!: Channel;
  currentUser!: User;
  messagesFromChannel: Message[] = [];

  constructor(
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private ms: MessageService,
    private activeRoute: ActivatedRoute,
    private us: UserService
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      let user = this.us.getCurrentUser();
      if (user) {
        this.currentUser = user;
      }

      // récupérer le name en URL pour récupérer le canal associé
      let name = params.get('name');
      if (name) {
        this.cs.getChannelByName(name).subscribe((data: any) => {
          this.canal = data;
        });
      }
    });
  }
}