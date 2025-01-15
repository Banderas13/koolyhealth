// ingredients.component.ts
import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink],
})
export class IngredientsComponent implements OnInit {
  selectedIngredients: any[] = [];
  totalCarbs: number = 0;

  constructor(private ingredientService: IngredientService, private insulinCalculatorService: InsulinCalculatorService) {}

  ngOnInit() {
    this.selectedIngredients = this.ingredientService.getSelectedIngredients();
    console.log(this.selectedIngredients);
    this.calculateTotalCarbs();
  }

  calculate(carbs: number, insuline: string, glucose: string, correction: string){
    document.getElementById("output")!.innerHTML = this.insulinCalculatorService.Calculate(carbs, insuline, glucose, correction);  
  }

  getCarbohydrates(ingredient: any): string {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
      return carbs ? `${this.ingredientService.GetCarbs(ingredient, ingredient.id)}${carbs.unit}/${this.ingredientService.GetAmount(ingredient, ingredient.id)}${carbs.unit}` : 'N/A';
  }

  removeIngredient(id : number){
    this.ingredientService.removeIngredient(id);
    this.calculateTotalCarbs();
    location.reload();
  }

  calculateTotalCarbs() {
    this.totalCarbs = this.ingredientService.calculateTotalCarbs();
    console.log(this.totalCarbs)
  }
}
