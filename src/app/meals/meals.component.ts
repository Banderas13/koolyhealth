import { Component, signal } from '@angular/core';
import { RecipeService } from '../shared/recipe.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-meals',
  imports: [JsonPipe],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {

  constructor(private recipeService: RecipeService){}

  recepies:any;

  GetRecipes(){
    this.recipeService.FetchData();
  }

  ngOnInit() {
    this.GetRecipes();
    this.recepies =  this.recipeService.recepies
    console.log(this.recepies);
  }

  CheckRecipe(id: any){
    this.recipeService.FetchRecepie(id);
  }

}

