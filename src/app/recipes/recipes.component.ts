import { Component } from '@angular/core';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { RecipeService } from '../shared/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent {
  constructor(
    private insulinCalculatorService: InsulinCalculatorService,
    private recipeService: RecipeService
  ) {}


  recepie:any;
  ingredients:any;
  description:any;

  calculate(carbs: number, glucose: number) {
    console.log(carbs);
    console.log(glucose);
    document.getElementById('output')!.innerHTML =
      this.insulinCalculatorService.Calculate(carbs, glucose);
  }

  ngOnInit() {
    this.recepie = this.recipeService.recepie;
    this.ingredients = this.recipeService.ingredients;
    this.description = this.recipeService.description;
    console.log(this.description);
  }

  //splits de stappen van de bereiding op achter elke punt
  getSteps(): string[] {
    const bereiding = this.recepie()?.bereiding || '';
    return bereiding
      .split('.')
      .map((step: string) => step.trim())
      .filter((step: string) => step.length > 0);
  }
}
