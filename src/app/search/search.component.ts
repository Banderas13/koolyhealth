import { Component } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class SearchComponent {
  searchQuery: string = '';
  ingredients: any[] = [];

  constructor(private ingredientService: IngredientService) {}

  searchIngredients() {
    this.ingredientService
      .searchIngredients(this.searchQuery)
      .subscribe((data) => {
        this.ingredients = data.results;
      });
  }

  addIngredient(ingredient: any) {
    let consumed = prompt(
      `How much did you consume of ${ingredient.name} in grams or mililitres? (NUMBERS ONLY)`,
      '100'
    );
    if (consumed != null && parseInt(consumed) != 0) {
      this.ingredientService
        .getIngredientInfo(ingredient.id)
        .subscribe((info) => {
          this.ingredientService.addIngredient(info, parseInt(consumed));
          alert(`${ingredient.name} added to the ingredient list!`);
        });
    } else {
      alert(`Product not added`);
    }
  }
}
