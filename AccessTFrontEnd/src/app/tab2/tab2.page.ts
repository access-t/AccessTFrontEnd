import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor() {}

  loggedIn() {
    return localStorage.getItem("logged_in") === "true";
  }

  signOut() {
    localStorage.setItem("logged_in", "false");
    localStorage.setItem("id_token", "");
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
  }
}