import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { Message } from 'src/app/Model/message';
import { User } from 'src/app/Model/user';
import { ChannelService } from 'src/app/Service/channel.service';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-create-message',
  templateUrl: './create-message.component.html',
  styleUrls: ['./create-message.component.css'],
})
export class CreateMessageComponent {
  @Output() Rafraichissement = new EventEmitter();
  message: Message = {
    messageId: '',
    messageContent: '',
    messageDate: new Date(),
    channel: {
      channelId: '',
      channelName: '',
      channelDescription: '',
      locked: 0,
      creationDate: new Date(),
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

  canalActuel!: Channel;
  currentUser: User | null;

  constructor(
    private ms: MessageService,
    private cs: ChannelService,
    private us: UserService,
    private ar: ActivatedRoute,
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
      this.Rafraichissement.emit();
    }
    // sinon, on le redirige vers la page de connexion
    else {
      alert('Veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}
