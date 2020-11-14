import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  goHome() {
    this.navCtrl.navigateBack("/tabs/account");
  }
}