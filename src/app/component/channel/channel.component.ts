import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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
    private route: Router
  ) {
    let user = us.getCurrentUser();
    if (user) this.currentUser = user;
  }

  ngOnInit(): void {
    // récupérer les messages liés à ce canal
    this.ms.getMessagesFromChannel(this.canal).subscribe((messagesList) => {
      this.messagesFromChannel = messagesList;
    });
  }

  // au clic, change l'affiche du formulaire
  onDisplayForm() {
    if ((this.displayForm = false)) {
      this.displayForm = true;
    } else {
      this.displayForm = false;
    }
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