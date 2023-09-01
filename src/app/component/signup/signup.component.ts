import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from 'src/app/Model/users';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.signupForm = this.fb.group({
      userName: ['', [Validators.required, Validators.maxLength(20)]],
      userMail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(event: Event) {
    if (this.signupForm.valid) {
      const formValue: Users = this.signupForm.value;

      this.userService.addUser(formValue).subscribe(
        (response: Users) => {
          alert('Vous êtes bien inscrit ! Passer sur la page Login');
          console.log('Nouvel utilisateur inscrit :', response);
        },
        (error: HttpErrorResponse) => {
          alert('Une erreur est survenue lors de l\'inscription');
          console.error('Erreur lors de l\'inscription :', error);
        }
      );
    } else {
      alert('Le formulaire d\'inscription est invalide');
      console.log('Le formulaire d\'inscription est invalide');
    }
  }

}
