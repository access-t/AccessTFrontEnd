import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';
import { PageService } from 'src/app/page.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  private image: ArrayBuffer;
  private collectionName: string;
  private items = [];

  constructor(private navCtrl: NavController, private api: ApiService, private alert: AlertController, private page: PageService) { }

  ngOnInit() {
    this.collectionName = this.page.pageData["collection_name"];
    this.items = this.page.pageData["items"].items;
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      this.image = reader.result as ArrayBuffer;
    };
    reader.onerror = (error) => {
    };
  };

  addItem(form) {
    this.api.addItem(this.collectionName, form.value.phrase, this.image).subscribe(result => {
      window.location.href = "/";
    }, err => {
      let message = "";
      if (err.status == 500)
        message = "Error adding item";
      else
        message = "File too big!";
      const alert = this.alert.create({
        header: "Alert",
        subHeader: message,
        message: err.error.message,
        buttons: ["OK"]
      });
      alert.then((alert) => alert.present());
    });
  }

  goBack() {
    this.navCtrl.navigateBack("/item");
  }
}