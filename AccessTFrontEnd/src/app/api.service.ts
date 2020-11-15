import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Collection } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = "http://18.218.11.137/";
  endpointRegister = "api/account/create";
  endpointLogin = "api/account/login";
  endpointCollections = "api/collections";

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      "Something bad happened; please try again later.");
  }

  private setSession(authResult) {
    localStorage.setItem("id_token", authResult);
  }

  public login(username: string, password: string) {
    const endpoint = this.apiURL + this.endpointLogin;
    const body = {
      username: username,
      password: password
    };

    return this.http.post(endpoint, body, {observe: "response"})
      .pipe(
        // catchError(this.handleError),
        tap(result => this.setSession(result["access_token"]))
      );
  }

  public getCollections() {
    const endpoint = this.apiURL + this.endpointCollections;
    return this.http.get(endpoint);
  }
}