import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  imports: [ CommonModule, RouterOutlet, RouterLink ],
  providers: [ UserService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {

constructor(private router: Router, private userService: UserService, ) {}
isDarkMode = false;

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  LogedIn(){
    console.log(this.userService.getName());
    
    if(this.userService.getName() !== null){
      console.log(true);
      return true;
    }
    else{
      console.log(false);
      return false;
    }
  }

  NgOnInit(){

  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;

    // Add or remove the 'dark' class on the <body>
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Save the preference to localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
}
