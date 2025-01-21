import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  imports: [ NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent implements OnInit {
  title = 'CarbWatch';

  ngOnInit(): void {
    initFlowbite();
  }
}
