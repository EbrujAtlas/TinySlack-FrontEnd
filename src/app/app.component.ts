import { Component } from '@angular/core';
import { User } from './Model/user';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TinySlack';
  currentUser: User | null;

  constructor(public userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();

    if (localStorage.length != 0 && localStorage.getItem('user')) {
      let localStorageUser = localStorage.getItem('user');

      if (localStorageUser != null) {
        const user: User = JSON.parse(localStorageUser);
        this.userService.login();
        this.userService.setCurrentUser(user);
      }
    }
  }

  logout() {
    this.userService.logout(); // Appel à la méthode de déconnexion
    this.userService.setCurrentUser(null); // Réinitialisation de l'utilisateur actuel
    alert('Vous venez de vous déconnecter.');
    console.log('Utilisateur déconnecté');
  }
}