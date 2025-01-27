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
    this.UserService.login(this.username, this.password).subscribe(response => {
      if (response) {
        const { token, id, firstname, carbeffect, insuline } = response; // Destructure the token and user ID from the response
        localStorage.setItem('token', token); // Store the token in localStorage
        localStorage.setItem('userId', id.toString()); // Store user ID in localStorage
        localStorage.setItem('firstname', firstname); // Store user ID in localStorage
        localStorage.setItem('carbEffect', carbeffect.toString()); //Store user carb effect in local storage
        localStorage.setItem('insulinCorrection', insuline.toString()); //Store user insuline effect in local storage
        
        
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
