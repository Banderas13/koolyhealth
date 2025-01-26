import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { FlowbiteThemeDirective } from 'flowbite-angular/theme';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  hostDirectives: [FlowbiteThemeDirective],
})
export class AppComponent implements OnInit {
  title = 'CarbWatch';
  isDarkMode = false;
  
  ngOnInit(): void {
    initFlowbite();

    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true'; // Convert the string back to boolean

    // Apply the dark mode class if needed
    if (this.isDarkMode) {
      document.body.classList.add('dark');
    }
  }
}
