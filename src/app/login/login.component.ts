import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, RouterLink],
  providers: [ UserService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private UserService: UserService, 
    private router: Router
  ) {}

  async onSubmit() {
    this.UserService.login(this.username, this.password).subscribe(token => {
      if (token) {
        localStorage.setItem('token', token);
        
        // Get the redirect URL from localStorage
        const redirectUrl = localStorage.getItem('redirectUrl') || '/';
        localStorage.removeItem('redirectUrl'); // Clean up
        
        // Navigate to the protected route or home
        this.router.navigate([redirectUrl]);
      } else {
        alert('Invalid username or password');
      }
    });
  }
}
