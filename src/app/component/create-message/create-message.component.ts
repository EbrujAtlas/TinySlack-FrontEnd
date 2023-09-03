import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Messages } from 'src/app/Model/messages';
import { Users } from 'src/app/Model/users';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent {
  currentUser: Users | null;

  message: Messages = {
    messageId: '',
    messageContent: '',
    messageDate: '',
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
  canalActuel!: Channels;

  // sendUser: Users;

  constructor(
    private ms: MessageService,
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private us: UserService,
    private route: Router
  ) {
    let name = this.ar.snapshot.params['name']; // capture des parametres dans url
    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    this.cs.getChannelByName(name).subscribe((data: any) => {
      console.log(data);
      this.canalActuel = data;
    });

    // récupérer le user de la session en cours
    // this.currentUser = this.us.getCurrentUser();
    // this.sendUser = this.us.getUserByName(this.currentUser.userName);
    // console.log(this.currentUser)
    this.currentUser = this.us.getCurrentUser();
  }

  AddMessage() {
    if (this.currentUser) {
      console.log(this.currentUser);

      // this.message.user = this.currentUser // on ecrase le use vide

      console.log(this.message.user);

      this.ms
        .postMessage(
          this.message.messageContent,
          this.currentUser,
          this.canalActuel
        )
        .subscribe();
      //utilise ce service ( s'abonner: acces /utilise/recevoir un service)
    } else {
      alert('veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}
