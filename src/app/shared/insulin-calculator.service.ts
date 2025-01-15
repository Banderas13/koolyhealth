import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsulinCalculatorService {

  constructor() { }

  //calculate carbs
  Calculate(carbs: number, insuline: string, glucose: string, correction: string){
    let eatenCarbsToInsuline = (carbs/(parseInt(insuline)|| 0));
    let targetGlucoseCalculation = correction? ((( glucose? parseInt(glucose) : 0) - 120)/parseInt(correction)) : 0;
    return (eatenCarbsToInsuline + targetGlucoseCalculation).toString();  
  }
}
