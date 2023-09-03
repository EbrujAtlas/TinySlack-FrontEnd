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
  message: Messages = {
    messageId: '',
    messageContent: '',
    messageDate: '',
    channel: {
      channelId: '',
      channelName: '',
      description: '',
      locked: 0,
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
  currentUser: Users | null;

  constructor(
    private ms: MessageService,
    private ar: ActivatedRoute,
    private cs: ChannelService,
    private us: UserService,
    private route: Router
  ) {
    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    let name = this.ar.snapshot.params['name'];
    this.cs.getChannelByName(name).subscribe((data: any) => {
      this.canalActuel = data;
    });

    // récupérer le user de la session en cours
    this.currentUser = this.us.getCurrentUser();
  }

  addMessage() {
    // si l'utilisateur est connecté, on envoie le message
    if (this.currentUser) {
      this.ms
        .postMessage(
          this.message.messageContent,
          this.currentUser,
          this.canalActuel
        )
        .subscribe();
        alert('Votre message a bien été envoyé');
    }
    // sinon, on le redirige vers la page de connexion
    else {
      alert('Veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}