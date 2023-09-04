import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Messages } from 'src/app/Model/messages';
import { Users } from 'src/app/Model/users';
import { MessageService } from 'src/app/Service/message.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-change-message',
  templateUrl: './change-message.component.html',
  styleUrls: ['./change-message.component.css'],
})
export class ChangeMessageComponent {
  messageModificationForm: FormGroup;

  @Input() actualmessage!: Messages;
  currentUser: Users | null;

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
      this.actualmessage.messageContent
    );
  }

  updatemessage(event: Event) {
    if (this.currentUser) {
      const modifiedmessage = {
        messageId: '',
        messageContent: this.messageModificationForm.value.messageContent,
        messageDate: new Date(),
        user: this.actualmessage.user,
        channel: this.actualmessage.channel,
      };
      console.log(modifiedmessage);
      this.ms.patchMessage(modifiedmessage).subscribe((response) => {
        // Gérez la réponse du serveur
        console.log('Réponse du serveur :', response);
        alert('Votre message a bien été modifié');
      });
    }
    // sinon, on le redirige vers la page de connexion si ce n'est pas l'utilisateur actuel
    else {
      alert('Veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}
