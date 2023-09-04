import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/Model/message';
import { User } from 'src/app/Model/user';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-change-message',
  templateUrl: './change-message.component.html',
  styleUrls: ['./change-message.component.css'],
})
export class ChangeMessageComponent {
  @Output() Rafraichissement = new EventEmitter();
  @Input() actualMessage!: Message;

  messageModificationForm: FormGroup;
  currentUser: User | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private ms: MessageService,
    private ar: ActivatedRoute,
    private route: Router
  ) {
    // récupérer le user de la session en cours
    this.currentUser = this.userService.getCurrentUser();

    this.messageModificationForm = this.fb.group({
      messageContent: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.messageModificationForm.controls['messageContent'].setValue(
      this.actualMessage.messageContent
    );
  }

  updatemessage(event: Event) {
    // si l'utilisateur est connecté et qu'il est le créateur du message, on effectue la modification du message
    if (this.currentUser) {
      const modifiedmessage = {
        messageId: this.actualMessage.messageId,
        messageContent: this.messageModificationForm.value.messageContent,
        messageDate: new Date(),
        user: this.actualMessage.user,
        channel: this.actualMessage.channel,
      };
      console.log(modifiedmessage);
      this.ms.patchMessage(modifiedmessage).subscribe((response) => {
        console.log('Réponse du serveur :', response);
        this.Rafraichissement.emit();
        this.route.navigate([
          '/channel/' + this.actualMessage.channel.channelName,
        ]);
      });
    }
    // sinon, on le redirige vers la page de connexion
    else {
      alert('Veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}
