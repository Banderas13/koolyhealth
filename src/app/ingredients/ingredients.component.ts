// ingredients.component.ts
import { Component, OnInit, signal, Signal } from '@angular/core';
import { IngredientService } from '../shared/ingredient.service';
import { InsulinCalculatorService } from '../shared/insulin-calculator.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    SearchComponent,
  ],
})
export class IngredientsComponent implements OnInit {
  selectedIngredients: any[] = [];
  totalCarbs = signal(0);
  // insuline = JSON.parse(localStorage.getItem('carbEffect')!);
  // correction = JSON.parse(localStorage.getItem('insulinCorrection')!);

  constructor(
    private ingredientService: IngredientService,
    private insulinCalculatorService: InsulinCalculatorService
  ) {}

  ngOnInit() {
    this.selectedIngredients = this.ingredientService.getSelectedIngredients();
    this.calculateTotalCarbs();
    // console.log(this.selectedIngredients);

    // console.log(this.selectedIngredients);
    // check if there has been a reload. if not it makes a reload (fix for add button and total carbs)
    if (!localStorage.getItem('reload')) {
      localStorage.setItem('reload', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('reload');
    }
  }

  calculate(carbs: number, glucose: number) {
    document.getElementById('output')!.innerHTML =
      this.insulinCalculatorService.Calculate(carbs, glucose);
  }

  getCarbohydrates(ingredient: any, index : number): string {
    const carbs = ingredient.nutrition?.nutrients?.find(
      (nutrient: any) => nutrient.name === 'Carbohydrates'
    );
    if (carbs) {
      const carbValue = parseFloat(
        this.ingredientService.GetCarbs(ingredient, index).toFixed(2)
      ); // Round carbs to 2 decimal places
      const amountValue = this.ingredientService.GetAmount(
        index
      );
      return `${carbValue}${carbs.unit} Amount:${amountValue}${carbs.unit}`;
    }

    return 'N/A';
  }

  removeIngredient(index : number) {
    this.ingredientService.removeIngredientByIndex(index);
    this.calculateTotalCarbs();
  }

  calculateTotalCarbs() {
    // const total = this.ingredientService.calculateTotalCarbs();
    // this.totalCarbs = parseFloat(total.toFixed(2));
    // console.log(this.totalCarbs);
    this.ingredientService.calculateTotalCarbs();
    const carbs = this.ingredientService.returnValue();
   
   this.totalCarbs.set(parseFloat(carbs.toFixed(2)))
  } 
}


