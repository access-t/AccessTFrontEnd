import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PageService } from 'src/app/page.service';
import { Item } from 'src/app/types';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  private items: Array<Item> = [];

  constructor(private navCtrl: NavController, private page: PageService) { }

  ngOnInit() {
    this.items = this.page.pageData["items"];
  }

  goHome() {
    this.navCtrl.navigateBack("/");
  }

  addItem() {
    this.page.pageData = { "collection_name": this.page.pageData.name, "items": this.items };
    this.navCtrl.navigateForward("/additem");
  }
}