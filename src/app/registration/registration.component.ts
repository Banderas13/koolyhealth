// import { Component } from '@angular/core';
// import { UserService } from '../shared/user.service';
// import { FormsModule } from '@angular/forms';
// import { Router, RouterLink } from '@angular/router';
// import { PersonalDataComponent } from "./personal-data/personal-data.component";
// import { InsulineDataComponent } from "./insuline-data/insuline-data.component";

// @Component({
//   selector: 'app-registration',
//   standalone: true,
//   imports: [FormsModule, RouterLink, PersonalDataComponent, InsulineDataComponent],
//   providers: [ UserService],
//   templateUrl: './registration.component.html',
//   styleUrl: './registration.component.css'
// })
// export class RegistrationComponent {
//   username!: string;
//   password!: string;
//   firstName!: string;
//   lastName!: string;
//   bdate!: any;
//   carbeffect!: number;
//   insuline!: number;


//   constructor(
//     private UserService: UserService,
//     private router: Router
//   ) {}

//   async onSubmit() {
//     (await this.UserService.register(
//       this.username,
//       this.password,
//       this.firstName,
//       this.lastName,
//       this.bdate,
//       this.carbeffect,
//       this.insuline
//     )).subscribe({
//       next: (response) => {
//         alert('User registered successfully!');
//         this.router.navigate(['/login']);
//       },
//       error: (error) => {
//         console.error('Error registering user:', error);
//         alert('An error occurred while registering. Please try again.');
//       }
//     });
//   }
// }


import { Component } from '@angular/core';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { InsulineDataComponent } from './insuline-data/insuline-data.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [PersonalDataComponent, InsulineDataComponent, CommonModule],
})
export class RegistrationComponent {
  currentStep = 1;
  formData: any = {};

  moveToNextStep(data: any) {
    this.formData = { ...this.formData, ...data };
    this.currentStep++;
  }

  moveToPreviousStep() {
    this.currentStep--;
  }

  handleSubmission(response: any) {
    console.log('Registration successful!', response);
    // Handle successful registration, e.g., show a success message or navigate
  }
}
