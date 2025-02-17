// ingredients.component.ts
import { Component, OnInit, signal } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule, SearchComponent],
})
export class IngredientsComponent implements OnInit {
  selectedIngredients: any[] = [];
  totalCarbs = signal(0);

  constructor(
    private ingredientService: IngredientService,
    private insulinCalculatorService: InsulinCalculatorService
  ) {}

  ngOnInit() {
    this.selectedIngredients = this.ingredientService.getSelectedIngredients();
    this.calculateTotalCarbs();
    initFlowbite();
    // console.log(this.selectedIngredients);
  }

  calculate(carbs: number, glucose: number) {
    document.getElementById(
      'output'
    )!.innerHTML = `You Need ${this.insulinCalculatorService.Calculate(
      carbs,
      glucose
    )} Units`;
  }

  getCarbohydrates(ingredient: any, index: number): string {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    if (carbs) {
      const carbValue = parseFloat(
        this.ingredientService.GetCarbs(ingredient, index).toFixed(2)
      ); // Round carbs to 2 decimal places
      const amountValue = this.ingredientService.GetAmount(index);
      return `${carbValue}${carbs.unit} Amount:${amountValue}${carbs.unit}`;
    }

    return 'N/A';
  }

  removeIngredient(index: number) {
    this.ingredientService.removeIngredientByIndex(index);
    this.calculateTotalCarbs();
  }

  calculateTotalCarbs() {
    // console.log(this.totalCarbs);
    this.ingredientService.calculateTotalCarbs();
    const carbs = this.ingredientService.returnValue();

    this.totalCarbs.set(parseFloat(carbs.toFixed(2)));
  }
}
