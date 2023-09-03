import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Channels } from 'src/app/Model/channels';
import { Users } from 'src/app/Model/users';
import { ChannelService } from 'src/app/Service/channel.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-change-channel',
  templateUrl: './change-channel.component.html',
  styleUrls: ['./change-channel.component.css'],
})
export class ChangeChannelComponent {
  channelModificationForm: FormGroup;

  actualChannel!: Channels;
  currentUser: Users | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cs: ChannelService,
    private ar: ActivatedRoute,
    private route: Router
  ) {
    // récupérer le name qui est dans l'URL pour afficher le channel correspondant
    let name = this.ar.snapshot.params['name'];
    this.cs.getChannelByName(name).subscribe((data: any) => {
      this.actualChannel = data;
    });

    // récupérer le user de la session en cours
    this.currentUser = this.userService.getCurrentUser();

    this.channelModificationForm = this.fb.group({
      channelId: [this.actualChannel.channelId],
      channelName: [
        this.actualChannel.channelName,
        [Validators.required, noSpacesValidator],
      ],
      description: [this.actualChannel.description, [Validators.required]],
      locked: [this.actualChannel.locked == 0],
    });
  }

  updateChannel(event: Event) {
    const formData = this.channelModificationForm.value;
    const isChecked = formData.locked;

    // transformer la valeur de la case à cocher en une valeur à envoyer en BDD
    const valueToSend = isChecked ? 1 : 0;

    // si l'utilisateur est connecté, on créé le canal
    if (this.currentUser) {
      this.cs
        .patchChannel(
          this.actualChannel.channelId,
          this.channelModificationForm.value
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