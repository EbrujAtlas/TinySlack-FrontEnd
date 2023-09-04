import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Channel } from 'src/app/Model/channel';
import { User } from 'src/app/Model/user';
import { ChannelService } from 'src/app/Service/channel.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-change-channel',
  templateUrl: './change-channel.component.html',
  styleUrls: ['./change-channel.component.css'],
})
export class ChangeChannelComponent {
  channelModificationForm: FormGroup;

  @Input() actualChannel!: Channel;
  currentUser: User | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private cs: ChannelService,
    private ar: ActivatedRoute,
    private route: Router
  ) {
    // récupérer le user de la session en cours
    this.currentUser = this.userService.getCurrentUser();

    this.channelModificationForm = this.fb.group({
      channelName: ['', [Validators.required, noSpacesValidator]],
      channelDescription: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.channelModificationForm.controls['channelName'].setValue(
      this.actualChannel.channelName
    );
    this.channelModificationForm.controls['channelDescription'].setValue(
      this.actualChannel.channelDescription
    );
  }

  updateChannel(event: Event) {
    // si l'utilisateur est connecté, on modifie le canal
    if (this.currentUser) {
      const modifiedChannel = {
        channelId: '',
        channelName: this.channelModificationForm.value.channelName,
        channelDescription:
          this.channelModificationForm.value.channelDescription,
        locked: 0,
        creationDate: new Date(),
        user: this.currentUser,
      };
      this.cs.patchChannel(modifiedChannel).subscribe((response) => {
        // Gérez la réponse du serveur
        console.log('Réponse du serveur :', response);
        alert('Votre canal a bien été modifié');
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