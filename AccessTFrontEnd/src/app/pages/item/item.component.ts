import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PageService } from 'src/app/page.service';
import { Item } from 'src/app/types';
import Speech from "speak-tts"

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  private items: Array<Item> = [];
  private speech: Speech;

  constructor(private navCtrl: NavController, private page: PageService) { }

  ngOnInit() {
    this.items = this.page.pageData["items"];
    this.speech = new Speech();
    //if (this.speech.hasBrowserSupport())
    //  this.speech.init({ "voice": "Google US English", "rate": 0.75 }).then(data => console.log(data));

    if (this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")

      this.speech.init().then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data)
      }).catch(e => {
        console.error("An error occured while initializing : ", e)
      })
    }
  }

  goHome() {
    this.navCtrl.navigateBack("/");
  }

  addItem() {
    this.page.pageData = { "collection_name": this.page.pageData.name, "items": this.items };
    this.navCtrl.navigateForward("/additem");
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
}