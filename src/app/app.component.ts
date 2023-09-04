import { Component } from '@angular/core';
import { User } from './Model/user';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Certif';
  currentUser: User | null;

  constructor(public userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }

  logout() {
    this.userService.logout(); // Appel à la méthode de déconnexion
    this.userService.setCurrentUser(null); // Réinitialisation de l'utilisateur actuel
    alert('Vous venez de vous déconnecter.');
    console.log('Utilisateur déconnecté');
  }
}
