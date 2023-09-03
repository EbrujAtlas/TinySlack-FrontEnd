import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/Model/users';
import { ChannelService } from 'src/app/Service/channel.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css'],
})
export class CreateChannelComponent {
  channelCreationForm: FormGroup;

  currentUser: Users | null;

  constructor(
    private fb: FormBuilder,
    public cs: ChannelService,
    private us: UserService,
    private route: Router
  ) {
    this.currentUser = this.us.getCurrentUser();
    this.channelCreationForm = this.fb.group({
      channelName: ['', [Validators.required, noSpacesValidator]],
      description: ['', [Validators.required]],
      locked: [false],
    });
  }

  addChannel(event: Event) {

    // si l'utilisateur est connecté, on créé le canal
    if (this.currentUser) {
      this.cs
        .postChannel(
          this.channelCreationForm.value,
          this.currentUser
        )
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