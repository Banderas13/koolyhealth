import { Component } from '@angular/core';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  constructor(private insulinCalculatorService: InsulinCalculatorService) {}

  calculate(carbs: number, insuline: string, glucose: string, correction: string){
    document.getElementById("output")!.innerHTML = this.insulinCalculatorService.Calculate(carbs, insuline, glucose, correction);  
  }
}
