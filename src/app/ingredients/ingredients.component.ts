// ingredients.component.ts
import { Component, OnInit } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
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

  constructor(private ingredientService: IngredientService) {}

  ngOnInit() {
    this.selectedIngredients = this.ingredientService.getSelectedIngredients();
    this.calculateTotalCarbs();
  }

  getCarbohydrates(ingredient: any): string {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    return carbs ? `${carbs.amount} ${carbs.unit}` : 'N/A';
  }

  openSearch() {
    // Logic to open the search component, can be done using routing or modals
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
