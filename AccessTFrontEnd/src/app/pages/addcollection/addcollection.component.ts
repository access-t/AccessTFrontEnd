import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addcollection',
  templateUrl: './addcollection.component.html',
  styleUrls: ['./addcollection.component.scss'],
})
export class AddCollectionComponent implements OnInit {
  public newCollectionForm: FormGroup;

  constructor(public navCtrl: NavController, private fb: FormBuilder) {
    this.newCollectionForm = fb.group({
      phrase: ['', Validators.compose([Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z0-9 -'?]*$")])]
      // image: []
    });
  }

  ngOnInit() { }

  goHome() {
    this.navCtrl.navigateBack("/");
  }
}