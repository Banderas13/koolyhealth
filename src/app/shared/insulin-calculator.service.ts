import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InsulinCalculatorService {
  insuline = JSON.parse(localStorage.getItem('carbEffect')!);
  correction = JSON.parse(localStorage.getItem('insulinCorrection')!);

  constructor() {}

  ngOnInit(): void {
    this.insuline = JSON.parse(localStorage.getItem('carbEffect')!);
    this.correction = JSON.parse(localStorage.getItem('insulinCorrection')!);
    // console.log(this.insuline);
    // console.log(this.correction);
  }

  //calculate carbs
  Calculate(carbs: number, glucose: number) {
    let eatenCarbsToInsuline = carbs / this.insuline || 0;
    let targetGlucoseCalculation = this.correction
      ? ((glucose ? glucose : 0) - 120) / this.correction
      : 0;
    return (eatenCarbsToInsuline + targetGlucoseCalculation)
      .toFixed(1)
      .toString();
  }
}
