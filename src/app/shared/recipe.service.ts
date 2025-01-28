import { Injectable, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private mealsUrl = 'http://127.0.0.1:8000/api/courses';
  private ingredientsUrl = 'http://127.0.0.1:8000/api/joinedingredients';
  private blogDescription = 'http://127.0.0.1:8000/api/blogs';
  recepies = signal([]);
  recepie = signal([]);
  ingredients = signal([]);
  description = signal([]);

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
    })
    .catch(e => console.log(e));

    fetch(this.blogDescription)
    .then(res2 => res2.json())
    .then(data => {
      let description = data.filter((desc: any) => desc.id === id);
      this.description.set(description);
    })
    .catch(e => console.log(e));
  }
}
