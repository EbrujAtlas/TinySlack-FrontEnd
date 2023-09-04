import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { Message } from 'src/app/Model/message';
import { User } from 'src/app/Model/user';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css'],
})
export class ChannelComponent {
  @Input() canal!: Channel;
  currentUser!: User;
  messagesFromChannel: Message[] = [];
  displayForm: boolean = false;

  constructor(
    private cs: ChannelService,
    private ms: MessageService,
    private us: UserService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

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
    // récupérer les messages liés à ce canal
    this.refresh(); //appel fonction qui permet de refresh les messages
  }

  refresh() {
    this.ms.getMessagesFromChannel(this.canal).subscribe((messagesList) => {
      this.messagesFromChannel = messagesList;
    });
  }
  // supprimer le canal
  delete() {
    this.cs.deleteChannel(this.canal).subscribe((response) => {
      console.log(response);
    });
    alert('Canal supprimé');
    this.route.navigate(['/profile']);
  }
}
