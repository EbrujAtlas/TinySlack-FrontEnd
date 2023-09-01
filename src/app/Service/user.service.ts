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

  //Constructeur
  constructor(private httpClient: HttpClient,) { }


  //Requete http
  getUsers(): Observable<Users[]> {
    return this.httpClient.get<Users[]>('http://localhost:8080/tinyslack/users');
  }

  addUser(user: Users): Observable<Users> {
    return this.httpClient.post<Users>('', user);
  }

  //Authenfication
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

  updateUser(user: Users) {
  }

}
