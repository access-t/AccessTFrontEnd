import { Component } from "@angular/core";
import { AlertController, NavController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { PageService } from "../page.service";
import { Collection } from "../types";
import Speech from "speak-tts";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  private api: ApiService;
  public collections = [];
  private speech: Speech;

  constructor(api: ApiService, private page: PageService, private navCtrl: NavController, private alert: AlertController) {
    this.api = api;
    if (this.loggedIn())
      this.getCollections();

    this.speech = new Speech();
    if (this.speech.hasBrowserSupport())
      this.speech.init({ "voice": "Google US English", "rate": 0.75 });
  }

  getCollections() {
    this.api.getCollections().subscribe((data) => {
      let collections: Collection[] = data["collections"];
      this.collections = collections;
    }, err => {
    });
  }

  loggedIn() {
    return localStorage.getItem("logged_in") === "true";
  }

  viewCollection(collection) {
    this.page.pageData = collection;
    this.navCtrl.navigateForward("/item");
  }

  speak(event, phrase) {
    if (event.detail > 1)
      return;
    this.speech.speak({ text: phrase });
  }

  delete(collection) {
    const alert = this.alert.create({
      header: "Delete Collection",
      message: "Are you sure you wish to delete this collection?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.api.deleteCollection(collection.name).subscribe(
              res => {
                window.location.href = "/";
              }, err => {
                console.log(err)
              });
          }
        }]
    });
    alert.then((_alert) => _alert.present());
  }
}