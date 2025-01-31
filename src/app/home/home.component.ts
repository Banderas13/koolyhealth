import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RecipeService } from '../shared/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  firstname = localStorage.getItem('firstname');

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
