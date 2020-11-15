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
    this.getCollections();
  }

  getCollections() {
    this.api.getCollections().subscribe((result) => {
      let collections: Collection[] = result["collections"];
      this.collections = collections;
    });
  }

  loggedIn() {
    return localStorage.getItem("logged_in") === "true";
  }
}