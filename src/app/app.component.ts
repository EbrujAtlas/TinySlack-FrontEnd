import { Component } from '@angular/core';
import { Users } from './Model/users';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Certif';
  currentUser: Users | null;

  constructor(public userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  } 

  logout() {
    this.userService.logout(); // Appel à la méthode de déconnexion
    this.userService.setCurrentUser(null); // Réinitialisation de l'utilisateur actuel
    alert('Vous venez de vous déconnecter.')
    console.log('Utilisateur déconnecté');
  }
}
