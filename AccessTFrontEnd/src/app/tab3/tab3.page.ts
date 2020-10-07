import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnyARecord } from 'dns';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  newCollectionForm:FormGroup;

  constructor( private fb: FormBuilder) {
    this.newCollectionForm = this.fb.group({
      phrase: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9 -'?]*$")])]
      // image: []
    });
  }

  saveCollection(){

  }

}
