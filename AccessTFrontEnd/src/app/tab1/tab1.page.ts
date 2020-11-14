import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  phrases = [{
    word: "eat",
    image: "test"
  },
  {
    word: "happy",
    image: "test"
  }];

  getCollection(){

    // call text-to-speech API
    audioClip = this.httpClient.get('https://cors-anywhere.herokuapp.com/');

    // return this.httpClient.get('https://cors-anywhere.herokuapp.com/http://augur.osshealth.io:5000/api/unstable/repos');

  }

}
