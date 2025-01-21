import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  imports: [ FormsModule ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  userId: number =  parseInt(localStorage.getItem('userId') || '0');
  carbEffect: number = 0;
  insulin: number = 0;
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  firstName: string = localStorage.getItem('firstname') || '';

  constructor(private userService: UserService) {}

  // Update Carb Effect
  updateCarbEffect() {
    this.userService.updateCarbEffect(this.userId, this.carbEffect).subscribe({
      next: () => alert('Carb effect updated successfully'),
      error: (err) => console.error('Error updating carb effect:', err),
    });
  }

  // Update Insulin
  updateInsulin() {
    this.userService.updateInsulin(this.userId, this.insulin).subscribe({
      next: () => alert('Insulin value updated successfully'),
      error: (err) => console.error('Error updating insulin value:', err),
    });
  }

  // Update Password
  updatePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }

    this.userService.updatePassword(this.userId, this.currentPassword, this.newPassword).subscribe({
      next: () => alert('Password updated successfully'),
      error: (err) => console.error('Error updating password:', err),
    });
  }
}