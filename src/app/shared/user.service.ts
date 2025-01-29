import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}

  firstnameUser = signal('');

  getName(){
    return localStorage.getItem("firstname");
  }

  SetSignal(){
    let name = localStorage.getItem("firstname") || '';
    this.firstnameUser.set(name);
  }

  // Fetches all users from the API
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((users) =>
        users.map((user) => ({
          id: user.id,
          username: user.email,
          password: user.password,
        }))
      )
    );
  }

  // Checks user credentials and returns a valid token or null and user ID and firstname
  login(
    username: string,
    password: string
  ): Observable<{
    token: string;
    id: number;
    firstname: string;
    carbeffect: number;
    insuline: number;
  } | null> {
    return this.http
      .post<{
        token: string;
        id: number;
        firstname: string;
        carbeffect: number;
        insuline: number;
      }>(`${this.apiUrl}/login`, { email: username, password })
      .pipe(
        map((response) => {
          return {
            token: response.token,
            id: response.id,
            firstname: response.firstname,
            carbeffect: response.carbeffect,
            insuline: response.insuline,
          };
        }),
        catchError(() => of(null))
      );
  }

  // Registers a new user
  async register(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    bdate: string,
    carbeffect: number,
    insuline: number
  ): Promise<Observable<any>> {
    const newUser = {
      email: username,
      password: password,
      firstname: firstName,
      lastname: lastName,
      bdate: bdate,
      carbeffect: carbeffect,
      insuline: insuline,
      roleid: 2,
    };

    return this.http.post(`${this.apiUrl}/register`, newUser);
  }

  updateCarbEffect(userId: number, carbEffect: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, {
      carbeffect: carbEffect,
    });
  }

  updateInsulin(userId: number, insulin: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, { insuline: insulin });
  }

  updatePassword(
    userId: number,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${userId}`, {
      currentPassword,
      password: newPassword,
    });
  }
}
