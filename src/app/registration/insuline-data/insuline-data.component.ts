import { Component, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators, ReactiveFormsModule, ValidationErrors, AbstractControl } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { initFlowbite } from 'flowbite';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insuline-data',
  templateUrl: './insuline-data.component.html',
  styleUrls: ['./insuline-data.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
})
export class InsulineDataComponent implements AfterViewInit {
  insulinForm: FormGroup;

  @Input() formData: any = {}; // Data from the previous step
  @Output() previousStep = new EventEmitter<void>();
  @Output() submit = new EventEmitter<any>();

  constructor(private fb: NonNullableFormBuilder, private UserService: UserService) {
    this.insulinForm = this.fb.group({
      carbeffect: [0, [Validators.required, this.nonZeroValidator]],
      insuline: [0, [Validators.required, this.nonZeroValidator]],
    });
  }

  ngAfterViewInit() {
    initFlowbite();
  }

    // Custom Validator
    nonZeroValidator(control: AbstractControl): ValidationErrors | null {
      return control.value > 0 ? null : { nonZero: true };
    }

  onPrevious() {
    this.previousStep.emit();
  }

  onSubmit() {
    if (this.insulinForm.valid) {
      const finalData = { ...this.formData, ...this.insulinForm.value };

      this.UserService
        .register(
          finalData.username,
          finalData.password,
          finalData.firstname,
          finalData.lastname,
          finalData.bdate,
          finalData.carbeffect,
          finalData.insuline
        ) 
        .then((response) => {
          response.subscribe({
            next: (res) => {
              console.log('Registration successful!', res);
              this.submit.emit(res);
            },
            error: (err) => {
              console.error('Registration failed!', err);
            },
          });
        });
    }
  }
  
}
