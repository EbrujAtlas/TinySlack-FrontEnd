import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  private userSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
  ) {
    this.loginForm = this.fb.group({
      userMail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    if (this.loginForm.valid) {
      const formValue: User = this.loginForm.value;
      this.userSubscription = this.userService.getUsers().subscribe(users => {
        const user = users.find(user => user.userMail === formValue.userMail && user.password === formValue.password);
        if (user) {
          this.userService.login();
          this.userService.setCurrentUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          this.route.navigate(['/profile']);
          console.log('Utilisateur connecté :', user);
        } else {
          console.log('Identifiants incorrects');
        }
      });
    } else {
      console.log('Le formulaire de connexion est invalide');
    }
  }

  logout() {
    this.userService.logout(); // Appel à la méthode de déconnexion
    localStorage.clear();
    console.log('Utilisateur déconnecté');
  }
}