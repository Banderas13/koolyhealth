import { Component } from '@angular/core';

@Component({
  selector: 'app-meals',
  imports: [],
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {

  calculate(carbs: string, insuline: string, glucose: string, target: string, correction: string){
    document.getElementById("output")!.innerHTML = (parseInt(carbs)/parseInt(insuline) + (parseInt(glucose) - parseInt(target))/parseInt(correction)).toString();
  }
}
