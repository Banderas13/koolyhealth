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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
