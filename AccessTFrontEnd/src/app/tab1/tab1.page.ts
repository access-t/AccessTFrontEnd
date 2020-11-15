import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { PageService } from '../page.service';
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
  private speech: Speech;
  speechData: any;

  constructor(api: ApiService, private page: PageService, private navCtrl: NavController) {
    this.api = api;
    this.getCollections();
    this.speech = new Speech() // will throw an exception if not browser supported

    if (this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")

      this.speech.init({
        listeners: {
          onvoiceschanged: voices => {
            console.log("Event voiceschanged", voices);
          }
        }
      }).then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
        this.speechData = data;
          data.voices.forEach(voice => {
            console.log(voice.name + " " + voice.lang);
          });
      }).catch(e => {
        console.error("An error occured while initializing : ", e)
      })
    }

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

  speakWord(phrase: String) {
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

  viewCollection(collection) {
    this.page.pageData = collection;
    this.navCtrl.navigateForward("/item");
  }

  setLanguage(i) {
    console.log(i);
    console.log(
      this.speechData.voices[i].lang + this.speechData.voices[i].name
    );
    this.speech.setLanguage(this.speechData.voices[i].lang);
    this.speech.setVoice(this.speechData.voices[i].name);
  }
}