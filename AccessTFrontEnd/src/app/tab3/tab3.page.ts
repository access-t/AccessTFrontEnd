import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page{

  public newCollectionForm:FormGroup;

  constructor( private fb: FormBuilder) {
    this.newCollectionForm = fb.group({
      phrase: ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.pattern("^[a-zA-Z0-9 -'?]*$")])]
      // image: []
    });
  }

  saveCollection(){

  }

}
