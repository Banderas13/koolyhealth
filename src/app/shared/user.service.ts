import { Injectable } from  '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) {}

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


  // Checks user credentials and returns a valid token or null
  async login(username: string, password: string): Promise<string | null> {
    const users = await this.getUsers().toPromise();
    const user = users?.find((u) => u.username === username);
    if (!user || user.password !== password) {
      return null;
    }
    return user.id.toString();
  }

  // Registers a new user
  async register( username: string,
    password: string,
    firstName: string,
    lastName: string,
    bdate: string,
    carbeffect: number,
    insuline: number): Promise<Observable<any>> {
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

    return this.http.post(this.apiUrl, newUser);
  }
}