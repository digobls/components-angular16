import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL = environment.apiJsonServer;

  constructor(private http: HttpClient) {}

  loadUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiURL}/users/${userId}`).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  listUsers(): Observable<any> {
    return this.http.get(`${this.apiURL}/users`).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}/users`, data).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  changeUser(userId: number, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}/users/${userId}`, data).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/users/${userId}`).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
