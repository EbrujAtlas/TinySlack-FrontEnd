import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Déclaration de variable
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;
  private users: User[] = [];

  // Constructeur
  constructor(private httpClient: HttpClient) {}

  // récupérer tous les utilisateurs
  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>('http://localhost:8080/tinyslack/users');
  }

  // récupérer un utilisateur par son nom
  getUserByName(userName: string) {
    return this.httpClient.get(
      'http://localhost:8080/tinyslack/users/' + userName
    );
  }

  // ajouter un nouvel utilisateur en BDD
  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(
      'http://localhost:8080/tinyslack/users',
      user
    );
  }

  // modifier un utilisateur existant en BDD
  updateUser(userName: string, user: User): Observable<User> {
    return this.httpClient.patch<User>(
      'http://localhost:8080/tinyslack/users/' + userName,
      user
    );
  }

  // supprimer un utilisateur existant en BDD
  deleteUser(userName: string | undefined): Observable<User> {
    return this.httpClient.delete<User>(
      'http://localhost:8080/tinyslack/users/' + userName
    );
  }

  // Authenfication (gère les affichages en fonction du statut)
  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  // définir l'utilisateur actuel et connecté de la session
  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }

  // récupérer l'utilisateur actuel et connecté de la session
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // pour charger les users bdd dans signup
  loadUsers() {
    this.httpClient
      .get<User[]>('http://localhost:8080/tinyslack/users')
      .subscribe((data) => {
        this.users = data;
      });
    console.log(this.users);
  }

  // permet de vérifier si l'user du signup utilise un nom/mail déjà utilisé en bdd
  getUserByUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  getUserByUserEmail(email: string): User | undefined {
    return this.users.find((user) => user.userMail === email);
  }
}
