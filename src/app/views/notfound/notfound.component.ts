import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notfound',
  template: `
    <p>La dirección solicitada no existe<p>
  `
})
export class NotfoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
