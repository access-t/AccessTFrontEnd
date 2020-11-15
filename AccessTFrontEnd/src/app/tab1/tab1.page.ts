import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Collection } from '../types';
import Speech from 'speak-tts';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private api: ApiService;
  private collections = [];
  private speech;

  constructor(api: ApiService) {
    this.api = api;
    this.getCollections();
    this.speech = new Speech() // will throw an exception if not browser supported

    if(this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")

      this.speech.init().then((data) => {
          // The "data" object contains the list of available voices and the voice synthesis params
          console.log("Speech is ready, voices are available", data)
        }).catch(e => {
          console.error("An error occured while initializing : ", e)
      })
    }

    //this.speakWord();
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

  speakWord( phrase: String ){
    this.speech.speak({
        text: phrase,
    }).then(() => {
        console.log("Success !")
    }).catch(e => {
        console.error("An error occurred :", e)
    })
  }
  
  loggedIn() {
    return localStorage.getItem("logged_in") === "true";
  }
}