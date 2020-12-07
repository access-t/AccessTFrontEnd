import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Collection } from './types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = "https://accesst.name/";
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

  public register(firstname: string, lastname: string, email: string, username: string, password: string) {
    const endpoint = this.apiURL + this.endpointRegister;
    const body = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      username: username,
      password: password
    };

    return this.http.post(endpoint, body, { observe: "response" })
      .pipe(
        // catchError(this.handleError),
        tap(result => this.setSession(result["access_token"]))
      );
  }

  public login(username: string, password: string) {
    const endpoint = this.apiURL + this.endpointLogin;
    const body = {
      username: username,
      password: password
    };

    return this.http.post(endpoint, body, { observe: "response" })
      .pipe(
        // catchError(this.handleError),
        tap(result => this.setSession(result["access_token"]))
      );
  }

  public getCollections() {
    const endpoint = this.apiURL + this.endpointCollections;
    return this.http.get(endpoint);
  }

  public createCollection(name: string, image: ArrayBuffer) {
    const endpoint = this.apiURL + this.endpointCollections;

    let formData = new FormData();
    let blob = new Blob([image], {
      type: "image/jpeg"
    });
    formData.append("collection_name", name);
    formData.append("image", blob);

    return this.http.post(endpoint, formData, { observe: "response" });
    /*
      .pipe(
        catchError(this.handleError),
      );
    */
  }

  public addItem(collection_name: string, name: string, image: ArrayBuffer) {
    const endpoint = this.apiURL + this.endpointCollections;

    let formData = new FormData();
    let blob = new Blob([image], {
      type: "image/jpeg"
    });
    formData.append("collection_name", collection_name);
    formData.append("name", name);
    formData.append("image", blob);

    return this.http.put(endpoint, formData, { observe: "response" });
  }

  public deleteCollection(collection_name: string) {
    return this.delete(collection_name, "all");
  }

  public delete(collection_name: string, item_name: string) {
    const endpoint = this.apiURL + this.endpointCollections;
    const body = {
      name: collection_name,
      item_name: item_name
    };
    return this.http.request("DELETE", endpoint, { body: body });
  }
}