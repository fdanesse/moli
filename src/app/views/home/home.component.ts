import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit, OnDestroy {

  // public info_print;

  constructor() { }

  ngOnInit() {
    /*
    this.info_print = {
      Browser_CodeName: navigator.appCodeName,
      Browser_Name: navigator.appName,
      Browser_Version: navigator.appVersion,
      Cookies_Enabled: navigator.cookieEnabled,
      Browser_Language: navigator.language,
      Browser_Online: navigator.onLine,
      Platform: navigator.platform,
      User_agent_header1: navigator.userAgent,
      User_agent_header2: navigator.product };
    */
  }

  ngOnDestroy() {
  }

}
