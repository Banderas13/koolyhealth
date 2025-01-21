import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class PersonalDataComponent {
  personalForm: FormGroup;

  @Output() nextStep = new EventEmitter<any>();

  constructor(private fb: NonNullableFormBuilder) {
    this.personalForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      bdate: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.personalForm.valid) {
      this.nextStep.emit(this.personalForm.value);
    }
  }
}
