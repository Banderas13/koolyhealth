import { Component } from '@angular/core';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { InsulineDataComponent } from './insuline-data/insuline-data.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [PersonalDataComponent, InsulineDataComponent, CommonModule],
})
export class RegistrationComponent {
  currentStep = 1;
  formData: any = {};

  constructor(private router: Router) {}

  moveToNextStep(data: any) {
    this.formData = { ...this.formData, ...data };
    this.currentStep++;
  }

  moveToPreviousStep() {
    this.currentStep--;
  }

  handleSubmission(response: any) {
    // console.log('Registration successful!', response);
    this.router.navigate(['/login']);
    alert('Registration succesful');
  }
}
