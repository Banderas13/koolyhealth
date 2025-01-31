import { Component } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css',
})
export class MealsComponent {
  constructor(private recipeService: RecipeService, private router: Router) {}

  recepies: any;

  GetRecipes() {
    this.recipeService.FetchData();
  }

  ngOnInit() {
    this.GetRecipes();
    this.recepies = this.recipeService.recepies;
  }

  CheckRecipe(id: any) {
    this.recipeService.FetchRecepie(id);
    this.router.navigate(['/recipes']);
  }
}
