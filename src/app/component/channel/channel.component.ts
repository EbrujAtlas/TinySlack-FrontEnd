import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Messages } from 'src/app/Model/messages';
import { Users } from 'src/app/Model/users';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  @Input() canal!: Channels;
  currentUser!: Users;
  messagesFromChannel: Messages[] = [];
  displayForm: boolean = false;

  constructor(
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private ms: MessageService,
    private activeRoute: ActivatedRoute,
    private us: UserService
  ) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

  onDisplayForm() {
    this.displayForm = true;
    console.log(this.displayForm)
  }
}