import { Injectable, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/courses';
  recepies = signal([]);
  recepie = signal([]);

  FetchData(){
    fetch(this.apiUrl)
    .then(res => res.json())
    .then(data => {
      this.recepies.set(data);
    })
    .catch(e => console.log(e));
  }

  FetchRecepie(id: any){
    fetch(this.apiUrl)
    .then(res => res.json())
    .then(data => {
      let recept = data.find((recepie: any) => recepie.id === id);
      this.recepie.set(recept);
    })
    .catch(e => console.log(e));
  }
}
