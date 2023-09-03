import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
    private us: UserService,
    private route: Router
  ) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

  ngOnInit(): void {
    // récupérer les messages liés à ce canal
    this.ms.getMessagesFromChannel(this.canal).subscribe((messagesList) => {
      console.log(messagesList);
      this.messagesFromChannel = messagesList;
    });
  }

  onDisplayForm() {
    this.displayForm = true;
    console.log(this.displayForm);
  }

  delete() {
    this.cs.deleteChannel(this.canal).subscribe((response) => {
      console.log(response);
    });
    alert('Canal supprimé');
    this.route.navigate(['/profile']);
  }
}