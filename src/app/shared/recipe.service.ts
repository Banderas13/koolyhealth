import { Injectable, output, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/courses';
  recepies = signal([]);

  FetchData(){
    fetch(this.apiUrl)
    .then(res => res.json())
    .then(data => {
      this.recepies.set(data);
    })
    .catch(e => console.log(e));
  }
}
