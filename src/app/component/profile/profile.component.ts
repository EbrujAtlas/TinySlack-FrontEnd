import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Model/user';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  currentUser: User | null;
  toggleBool: boolean = true;
  isInputVisible: boolean = false;
  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.currentUser = this.userService.getCurrentUser();
    this.updateForm = this.fb.group({
      userName: [this.currentUser?.userName, [Validators.maxLength(20)]],
      userMail: [this.currentUser?.userMail, [Validators.email]],
      password: [this.currentUser?.password, [Validators.minLength(5)]],
      userId: [this.currentUser?.userId],
    });
  }

  deleteUser() {
    this.userService.deleteUser(this.currentUser?.userName).subscribe();
  }

  updateUser() {
    if (this.currentUser !== null) {
      this.userService
        .updateUser(this.currentUser.userId, this.currentUser)
        .subscribe();
    } else {
      console.log("L'id est null !");
    }
  }

  onSubmit(event: Event) {
    if (this.updateForm.valid) {
      const formValue: User = this.updateForm.value;

      this.userService.updateUser(formValue.userId, formValue).subscribe(
        (response: User) => {
          this.isInputVisible = false;
          alert('Vos informations ont été mises à jour');
          console.log('Les information ont été mises à jour :', response);
        },
        (error: HttpErrorResponse) => {
          alert('Une erreur est survenue lors de la modification');
          console.error('Erreur lors de la modification :', error);
        },
      );
    } else {
      alert('Le formulaire de la modification est invalide');
      console.log('Le formulaire de la modification est invalide');
    }
  }

  visibilityInput() {
    this.isInputVisible = true;
  }

  // Function pour déverrouiller le bouton supprimer profil
  changeEvent(event: any) {
    if (event.target.checked) {
      this.toggleBool = false;
    } else {
      this.toggleBool = true;
    }
  }
}