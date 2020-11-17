import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { PageService } from 'src/app/page.service';
import { Item } from 'src/app/types';
import Speech from "speak-tts"
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  private items: Array<Item> = [];
  private speech: Speech;

  constructor(private navCtrl: NavController, private page: PageService, private api: ApiService, private alert: AlertController) { }

  ngOnInit() {
    this.items = this.page.pageData["items"];
    this.speech = new Speech();
    if (this.speech.hasBrowserSupport())
      this.speech.init({ "voice": "Google US English", "rate": 0.75 }).then(data => console.log(data));
  }

  goHome() {
    this.navCtrl.navigateBack("/");
  }

  addItem() {
    this.page.pageData = { "collection_name": this.page.pageData.name, "items": this.items };
    this.navCtrl.navigateForward("/additem");
  }

  speak(phrase) {
    this.speech.speak({ text: phrase });
  }

  delete(item) {
    const alert = this.alert.create({
      header: "Delete Item",
      message: "Are you sure you wish to delete this item?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel"
        },
        {
          text: "Delete",
          handler: () => {
            this.api.delete(this.page.pageData.name, item).subscribe(
              res => {
                window.location.href = "/";
              },
              err => {
                console.log(err)
              });
          }
        }]
    });
    alert.then((_alert) => _alert.present());
  }
}