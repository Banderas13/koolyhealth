import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private apiKey = '09a08ff038e4498caa0bc0ccb4fb09a6';
  private selectedIngredients: any[] = [];
  private carbs: any[] = [];
  private amount: any[] = [];
  returnValue = signal<number>(0);

  constructor(private http: HttpClient) {
    // Load saved ingredients and carb info from localStorage on initialization
    const savedIngredients = localStorage.getItem('selectedIngredients');
    const savedCarbs = localStorage.getItem('carbs');
    const savedAmount = localStorage.getItem('amount');
    this.selectedIngredients = savedIngredients
      ? JSON.parse(savedIngredients)
      : [];
    this.carbs = savedCarbs ? JSON.parse(savedCarbs) : [];
    this.amount = savedAmount ? JSON.parse(savedAmount) : [];
  }

  // Search for ingredients
  searchIngredients(query: string): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/food/ingredients/search?query=${query}&apiKey=${this.apiKey}`
    );
  }

  // Get ingredient information
  getIngredientInfo(id: number): Observable<any> {
    return this.http.get(
      `https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${this.apiKey}`
    );
  }

  // Add selected ingredient and save to localStorage
  addIngredient(ingredient: any, amount: number) {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    const servingsize = ingredient.nutrition?.weightPerServing?.amount;
    // console.log(servingsize)
    this.selectedIngredients.push(ingredient);
    this.carbs.push((carbs.amount / servingsize) * amount);
    this.amount.push(amount);
    this.saveToLocalStorage();
  }

  GetCarbs(ingredient: any, index: number) {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    const servingsize = ingredient.nutrition?.weightPerServing?.amount;
    // console.log(carbs.amount + "carbs");
    // console.log(servingsize);
    // console.log(ingredient);
    // console.log(id);
    // console.log(this.amount);
    // console.log(this.amount[this.selectedIngredients.findIndex(ingredient => ingredient.id === id)]);
    // console.log(carbs.amount/servingsize*this.amount[this.selectedIngredients.findIndex(ingredient => ingredient.id === id)]);
    return (carbs.amount / servingsize) * this.amount[index];
  }

  GetAmount(index: number) {
    // console.log("hier geraak ik ook");
    return this.amount[index];
  }

  // Get selected ingredients
  getSelectedIngredients(): any[] {
    return this.selectedIngredients;
  }

  // Remove an ingredient by index
  removeIngredientByIndex(index: number) {
    if (index >= 0 && index < this.selectedIngredients.length) {
      // Remove the ingredient, carbs, and amount at the same index
      this.selectedIngredients.splice(index, 1);
      this.carbs.splice(index, 1);
      this.amount.splice(index, 1);
      this.saveToLocalStorage();
    }
  }

  // Calculate total carbs
  calculateTotalCarbs() {
    // console.log(this.carbs, "carbs")
    let val = 0;
    for (let i = 0; i < this.carbs.length; i++) {
      val += this.carbs[i];
    }
    this.returnValue.set(val);
    // console.log(this.returnValue, "return")
  }

  // Save the current list of ingredients to localStorage
  private saveToLocalStorage() {
    localStorage.setItem(
      'selectedIngredients',
      JSON.stringify(this.selectedIngredients)
    );
    localStorage.setItem('carbs', JSON.stringify(this.carbs));
    localStorage.setItem('amount', JSON.stringify(this.amount));
  }
}
