import { Component, OnInit, Input } from '@angular/core';
import { EmailComponent } from './email.component';


@Component({
  selector: 'app-emails',
  template: `
  <app-email *ngFor='let registro of registros; index as idx'
    [email]='registro' [index]='idx' (changed)='changedEmail($event)'
    (deleted)='deletedEmail($event)'>
  </app-email>
  `
})
export class EmailsComponent implements OnInit {

  @Input() registros: any;
  regs = [];

  constructor() { }

  deletedEmail(id) {
    this.regs.splice(id, 1);
  }

  changedEmail(params) {
    this.regs[params[0]] = params[1];
  }

  ngOnInit() {
    if (this.registros) {
      this.regs = this.registros;
    }
  }

}
