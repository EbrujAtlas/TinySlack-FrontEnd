import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';

//Validator perso pour check si password = passwordConfirm
function passwordsMatchValidator(
  control: AbstractControl,
): { [key: string]: boolean } | null {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (password && passwordConfirm && password.value !== passwordConfirm.value) {
    return { passwordsNotMatch: true };
  }

  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
  ) {
    this.signupForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.maxLength(20)]],
        userMail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]],
        passwordConfirm: ['', [Validators.required, Validators.minLength(5)]],
      },
      { validator: passwordsMatchValidator },
    );

    this.userService.loadUsers();
  }

  onSubmit(event: Event) {
    if (this.signupForm.valid) {
      const formValue: User = this.signupForm.value;

      // vérifier si le nom d'utilisateur existe déjà
      if (this.userService.getUserByUserName(formValue.userName)) {
        window.alert("Le nom d'utilisateur existe déjà.");
      }
      // vérifier si l'adresse e-mail existe déjà
      else if (this.userService.getUserByUserEmail(formValue.userMail)) {
        window.alert("L'adresse e-mail existe déjà.");
      } else {
        this.userService.addUser(formValue).subscribe(
          (response: User) => {
            this.route.navigate(['/login']);

            console.log('Nouvel utilisateur inscrit :', response);
          },
          (error: HttpErrorResponse) => {
            console.error("Erreur lors de l'inscription :", error);
          },
        );
      }
    } else {
      console.log("Le formulaire d'inscription est invalide");
    }
  }
}
