import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from '../Model/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  //Déclaration de variable
  private isLoggedIn: boolean = false;
  private currentUser: Users | null = null;
  private users: Users[] = [];

  //Constructeur
  constructor(private httpClient: HttpClient,) { }


  //Requete http
  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>('http://localhost:8080/tinyslack/users');
  }

  // Récupérer l'utilisateur par son nom
  getUserByName(userName: string) {
    return this.httpClient.get('http://localhost:8080/tinyslack/users/' + userName);
  }

  addUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>('http://localhost:8080/tinyslack/users', user );
  }

  deleteUser(userName: string | undefined ): Observable<Users>  {
    return this.httpClient.delete<Users>('http://localhost:8080/tinyslack/users/' + userName);
  }

  updateUser(userId: string, user: Users ): Observable<Users>  {
    return this.httpClient.patch<Users>('http://localhost:8080/tinyslack/users/' + userId, user);
  }

  //Authenfication gere les affichages en fonction du statut
  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
  }

  isLoggedInUser(): boolean {
    return this.isLoggedIn;
  }

  //setCurrentUser qui va permettre de trouver l'user actuellement connecté
  setCurrentUser(user: Users | null) {
    this.currentUser = user;
  }

  getCurrentUser(): Users | null {
    return this.currentUser;
  }


  //pour charger les users bdd dans signup
  loadUsers() {
    this.httpClient.get<Users[]>('http://localhost:8080/tinyslack/users').subscribe((data) => {
      this.users = data;
    });
    console.log(this.users);
  }

  //permet de vérifier si l'user du signup utilise un nom/mail déjà utilisé en bdd
  getUserByUserName(userName: string): Users | undefined {
    return this.users.find((user) => user.userName === userName);
  }

  getUserByUserEmail(email: string): Users | undefined {
    return this.users.find((user) => user.userMail === email);
  }
}

