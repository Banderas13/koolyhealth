import { Component } from '@angular/core';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-recipes',
  imports: [],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  constructor(private insulinCalculatorService: InsulinCalculatorService, private recipeService: RecipeService) {}

  recepie:any;

  calculate(carbs: string, insuline: string, glucose: string, correction: string){
    console.log(carbs);
    console.log(insuline);
    console.log(glucose);
    console.log(correction);
    document.getElementById("output")!.innerHTML = this.insulinCalculatorService.Calculate(parseInt(carbs), insuline, glucose, correction); 
  }

  ngOnInit(){
    this.recepie = this.recipeService.GetRecipeIntoRecipePage();
    console.log(this.recepie);
  }
}
