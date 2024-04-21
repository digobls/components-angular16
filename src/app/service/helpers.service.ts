import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment} from '../../environments/environment';
import { map, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  apiURL = environment.apiJsonServer;

  constructor(private http: HttpClient) {}

  listLanguages(): Observable<any> {
    return this.http.get(`${this.apiURL}/languages`).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }

  listRoles(): Observable<any> {
    return this.http.get(`${this.apiURL}/roles`).pipe(
      map((response: any) => {
        return response || [];
      }),
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
}
