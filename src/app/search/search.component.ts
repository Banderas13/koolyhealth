import { Component } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';

import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true,
  imports: [ FormsModule, CommonModule, NgFor],
})
export class SearchComponent {
  searchQuery: string = '';
  ingredients: any[] = [];

  constructor(private ingredientService: IngredientService) {}

  searchIngredients() {
    this.ingredientService.searchIngredients(this.searchQuery).subscribe(data => {
      this.ingredients = data.results;
    });
  }

  addIngredient(ingredient: any) {
    this.ingredientService.getIngredientInfo(ingredient.id).subscribe(info => {
      this.ingredientService.addIngredient(info);
      alert(`${ingredient.name} added to the ingredient list!`);
    });
  }
}
