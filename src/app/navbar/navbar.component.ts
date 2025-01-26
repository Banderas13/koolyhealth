import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  imports: [ RouterOutlet, RouterLink ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
})
export class NavbarComponent {

constructor(private router: Router) {}
isDarkMode = false;

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstname');
    this.router.navigate(['/login']);
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
