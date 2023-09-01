import { Component } from '@angular/core';
import { Users } from 'src/app/Model/users';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  currentUser: Users | null;

  constructor(private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
  }
}
