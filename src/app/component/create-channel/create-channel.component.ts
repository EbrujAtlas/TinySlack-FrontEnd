import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { ChannelService } from 'src/app/Service/channel.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css'],
})
export class CreateChannelComponent {
  channelCreationForm: FormGroup;

  currentUser: User | null;

  constructor(
    private fb: FormBuilder,
    public cs: ChannelService,
    private us: UserService,
    private route: Router
  ) {
    this.currentUser = this.us.getCurrentUser();
    this.channelCreationForm = this.fb.group({
      channelName: ['', [Validators.required, noSpacesValidator]],
      channelDescription: ['', [Validators.required]],
    });
  }

  addChannel(event: Event) {
    // si l'utilisateur est connecté, on créé le canal
    if (this.currentUser) {
      const newChannel = {
        channelId: '',
        channelName: this.channelCreationForm.value.channelName,
        channelDescription: this.channelCreationForm.value.channelDescription,
        locked: 0,
        creationDate: new Date(),
        user: this.currentUser,
      };
      this.cs
        .postChannel(newChannel, this.currentUser)
        .subscribe((response) => {
          // Gérez la réponse du serveur
          console.log('Réponse du serveur :', response);
          alert('Votre canal a bien été créé');
        });
    }
    // sinon, on le redirige vers la page de connexion
    else {
      alert('Veuillez vous connecter');
      this.route.navigate(['/login']);
    }
  }
}

// validateur personnalisé pour vérifier si une chaîne de caractères contient des espaces
function noSpacesValidator(control: AbstractControl) {
  const hasSpaces = /\s/.test(control.value);
  return hasSpaces ? { hasSpaces: true } : null;
}