import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-addcollection',
  templateUrl: './addcollection.component.html',
  styleUrls: ['./addcollection.component.scss'],
})
export class AddCollectionComponent implements OnInit {
  public newCollectionForm: FormGroup;
  private image: ArrayBuffer;

  constructor(public navCtrl: NavController, public api: ApiService, private alert: AlertController, private fb: FormBuilder) {
    this.newCollectionForm = fb.group({
      phrase: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 -'?]*$")])]
    });
  }

  ngOnInit() { }

  goHome() {
    this.navCtrl.navigateBack("/");
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

  saveCollection(form) {
    this.api.createCollection(form.value.phrase, this.image).subscribe(result => {
      window.location.href = "/";
    }, err => {
      if (err.status == 500) {
        const alert = this.alert.create({
          header: "Alert",
          subHeader: "Error adding collection",
          message: err.error.message,
          buttons: ["OK"]
        });
        alert.then((alert) => alert.present());
      }
    });
  }
}