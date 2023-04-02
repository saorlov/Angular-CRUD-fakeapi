import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginUser} from "../model/user";
import {Observable, tap, map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly loginUrl = 'https://reqres.in/api/login'
  private readonly registerUrl = 'https://reqres.in/api/register'

  constructor(private http: HttpClient) {
  }

  login(user: LoginUser): Observable<string> {
    return this.http.post<{ token: string }>(`${this.loginUrl}`, user)
      .pipe(
        tap(({token}) => {
          sessionStorage.setItem('authToken', token)
        }),
        map(({token}) => {
          return token
        })
      )
  }

  register(user: LoginUser): Observable<string> {
    return this.http.post<{ token: string }>(`${this.registerUrl}`, user)
      .pipe(
        tap(({token}) => {
          sessionStorage.setItem('authToken', token)
        }),
        map(({token}) => {
          return token
        })
      )
  }

  public getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  public isAuthenticated(): boolean {
    return !!sessionStorage.getItem('authToken');
  }

  logOut() {
    sessionStorage.removeItem('authToken')
  }
}
