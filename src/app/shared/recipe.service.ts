import { Injectable, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private mealsUrl = 'http://127.0.0.1:8000/api/courses';
  private ingredientsUrl = 'http://127.0.0.1:8000/api/courseingredients';
  private ingredientDetailsUrl = 'http://127.0.0.1:8000/api/ingredients';
  recepies = signal([]);
  recepie = signal([]);
  ingredients = signal([]);
  ingredientName = '';

  FetchData(){
    fetch(this.mealsUrl)
    .then(res => res.json())
    .then(data => {
      this.recepies.set(data);
      console.log(this.recepies);
    })
    .catch(e => console.log(e));
  }

  FetchRecepie(id: any){
    fetch(this.mealsUrl)
    .then(res => res.json())
    .then(data => {
      let recept = data.find((recepie: any) => recepie.id === id);
      this.recepie.set(recept);
      console.log(this.recepie);
    })
    .catch(e => console.log(e));

    fetch(this.ingredientsUrl)
    .then(res2 => res2.json())
    .then(data => {
      let ingredients = data.filter((ingredient: any) => ingredient.courseid === id);
      this.ingredients.set(ingredients);
      console.log(this.ingredients);
    })
    .catch(e => console.log(e));
  }

  getRecipeName(id: number){
    let name;

    fetch(this.ingredientDetailsUrl)
    .then(res => res.json())
    .then(data => {
      let ingredient = data.find((ingredient: any) => ingredient.id === id);
      
      this.ingredientName = ingredient.name;
    })
    .catch(e => console.log(e));
  }

  GetRecipeIntoRecipePage(){
    return this.recepie;
  }
}
