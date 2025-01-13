import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiKey = '09a08ff038e4498caa0bc0ccb4fb09a6';
  private selectedIngredients: any[] = [];

  constructor(private http: HttpClient) {
    // Load saved ingredients from localStorage on initialization
    const savedIngredients = localStorage.getItem('selectedIngredients');
    this.selectedIngredients = savedIngredients ? JSON.parse(savedIngredients) : [];
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
    this.selectedIngredients.push(ingredient);
    this.saveToLocalStorage();
  }

  // Get selected ingredients
  getSelectedIngredients(): any[] {
    return this.selectedIngredients;
  }

  // Remove an ingredient and save to localStorage
  removeIngredient(id: number) {
    this.selectedIngredients = this.selectedIngredients.filter(ingredient => ingredient.id !== id);
    this.saveToLocalStorage();
  }

  // Calculate total carbs
  calculateTotalCarbs(): number {
    return this.selectedIngredients.reduce((total, ingredient) => total + (ingredient.nutrition?.Carbohydrates || 0), 0); //need to fix path
    
  }

  // Save the current list of ingredients to localStorage
  private saveToLocalStorage() {
    localStorage.setItem('selectedIngredients', JSON.stringify(this.selectedIngredients));
  }
}
