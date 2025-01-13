import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, filter, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiKey = '09a08ff038e4498caa0bc0ccb4fb09a6';
  private selectedIngredients: any[] = [];
  private carbs: any[] = [];

  constructor(private http: HttpClient) {
    // Load saved ingredients from localStorage on initialization
    const savedIngredients = localStorage.getItem('selectedIngredients');
    const savedCarbs = localStorage.getItem('carbs');
    this.selectedIngredients = savedIngredients ? JSON.parse(savedIngredients) : [];
    this.carbs = savedCarbs ? JSON.parse(savedCarbs) : [];
  }

  // Search for ingredients
  searchIngredients(query: string): Observable<any> {
    return this.http.get(`https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${this.apiKey}`);
  }

  // Get ingredient information
  getIngredientInfo(id: number): Observable<any> {
    return this.http.get(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${this.apiKey}`);
  }

  // Add selected ingredient and save to localStorage
  addIngredient(ingredient: any) {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    this.selectedIngredients.push(ingredient);
    this.carbs.push(carbs.amount);
    this.saveToLocalStorage();
  }

  // Get selected ingredients
  getSelectedIngredients(): any[] {
    return this.selectedIngredients;
  }

  // Remove an ingredient and save to localStorage
  removeIngredient(id: number) {
    if(this.carbs.length != 1){
      delete this.carbs[this.selectedIngredients.findIndex(ingredient => ingredient.id === id)];
      this.carbs = this.carbs.filter(e => e != null);
    }
    else{
      this.carbs = [];
    }
    this.selectedIngredients = this.selectedIngredients.filter(ingredient => ingredient.id !== id);
    this.saveToLocalStorage();
  }

  // Calculate total carbs
  calculateTotalCarbs(): number {
    console.log(this.carbs);
    let returnvalue = 0;
    for(let i = 0; i < this.carbs.length; i++){
      returnvalue += this.carbs[i];
    }
    console.log(returnvalue);
    return returnvalue;
  }

  // Save the current list of ingredients to localStorage
  private saveToLocalStorage() {
    localStorage.setItem('selectedIngredients', JSON.stringify(this.selectedIngredients));
    localStorage.setItem('carbs', JSON.stringify(this.carbs));
  }
}
