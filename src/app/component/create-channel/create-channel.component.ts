import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ChannelService } from 'src/app/Service/channel.service';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.css'],
})
export class CreateChannelComponent {
  channelCreationForm: FormGroup;

  constructor(private fb: FormBuilder, public cs: ChannelService, private route: Router) {
    this.channelCreationForm = this.fb.group({
      channelName: ['', [Validators.required, noSpacesValidator]],
      description: ['', [Validators.required]],
    });
  }

  onClick(event: Event) {
    this.cs.postChannel(this.channelCreationForm.value).subscribe();
    alert('Ton canal a bien été créé');
  }
}

// validateur personnalisé pour vérifier si une chaîne de caractères contient des espaces
function noSpacesValidator(control: AbstractControl) {
  const hasSpaces = /\s/.test(control.value);
  return hasSpaces ? { hasSpaces: true } : null;
}