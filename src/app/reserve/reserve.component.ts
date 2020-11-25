import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.css']
})
export class ReserveComponent implements OnInit {

  form: FormGroup;


  constructor() {
    this.form = new FormGroup({

    })
  }

  ngOnInit(): void {
  }

}
