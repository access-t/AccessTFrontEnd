import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Collection } from '../types';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private api: ApiService;
  private collections = [];

  constructor(api: ApiService) {
    this.api = api;
    if (this.loggedIn())
      this.getCollections();
  }

  getCollections() {
    this.api.getCollections().subscribe((data) => {
      let collections: Collection[] = data["collections"];
      this.collections = collections;
    }, err => {
      // TODO need to refresh token here
    });
  }

  loggedIn() {
    return localStorage.getItem("logged_in") === "true";
  }
}