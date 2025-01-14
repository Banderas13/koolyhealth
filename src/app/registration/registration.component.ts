import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ FormsModule, RouterLink],
  providers: [ UserService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  bdate!: any;
  carbeffect!: number;
  insuline!: number;


  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  async onSubmit() {
    (await this.UserService.register(
      this.username,
      this.password,
      this.firstName,
      this.lastName,
      this.bdate,
      this.carbeffect,
      this.insuline
    )).subscribe(
      (response) => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error registering user:', error);
        alert('An error occurred while registering. Please try again.');
      }
    );
  }
}
