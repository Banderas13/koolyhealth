// ingredients.component.ts
import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet, RouterLink, SearchComponent],
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
    if (carbs) {
      const carbValue = parseFloat(this.ingredientService.GetCarbs(ingredient, ingredient.id).toFixed(2)); // Round carbs to 2 decimal places
      const amountValue = this.ingredientService.GetAmount(ingredient, ingredient.id);
      return `${carbValue}${carbs.unit} Amount:${amountValue}${carbs.unit}`;
    }
  
    return 'N/A';
  }

  removeIngredient(id : number){
    this.ingredientService.removeIngredient(id);
    this.calculateTotalCarbs();
    location.reload();
  }

  calculateTotalCarbs() {
    const total = this.ingredientService.calculateTotalCarbs();
    this.totalCarbs = parseFloat(total.toFixed(2));
    console.log(this.totalCarbs);
  }
  
}
