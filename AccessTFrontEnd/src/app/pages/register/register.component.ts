import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  email_address: string;
  first: string;
  last: string;

  constructor(public navCtrl: NavController, private api: ApiService, private alert: AlertController) { }

  ngOnInit() { }

  goHome() {
    this.navCtrl.navigateBack("/tabs/account");
  }

  register(form) {
    const value = form.value;
    this.api.register(value.firstname, value.lastname, value.email, value.user, value.pass)
      .subscribe(
        data => {
          localStorage.setItem("id_token", data.body["access_token"]);
          localStorage.setItem("logged_in", "true");
          const alert = this.alert.create({
            header: "Alert",
            subHeader: "Account succesfully created!",
            message: "You have been signed in.",
            buttons: [{
              text: "OK",
              handler: () => {
                alert.then((_alert) => { _alert.dismiss().then(() => window.location.href = "/") });
              }
            }]
          });
          alert.then((alert) => alert.present());
        },
        err => {
          if (err.status == 500) {
            const alert = this.alert.create({
              header: "Alert",
              subHeader: "Error registering user",
              message: err.error.message,
              buttons: ["OK"]
            });
            alert.then((alert) => alert.present());
          }
        });
  }
}