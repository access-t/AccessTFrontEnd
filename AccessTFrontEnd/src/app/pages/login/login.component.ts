import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  username: string;
  password: string;

  constructor(public navCtrl: NavController, public api: ApiService, public fb: FormBuilder, public alert: AlertController) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(form) {
    this.api.login(form.value.user, form.value.pass)
      .subscribe(
        data => {
          localStorage.setItem("id_token", data.body["access_token"]);
          localStorage.setItem("logged_in", "true");
          const alert = this.alert.create({
            header: "Alert",
            subHeader: "Login successful!",
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
              subHeader: "Invalid Login",
              message: err.error.message,
              buttons: ["OK"]
            });
            alert.then((alert) => alert.present());
          }
        });
  }

  goHome() {
    this.navCtrl.navigateBack("/tabs/account");
  }
}