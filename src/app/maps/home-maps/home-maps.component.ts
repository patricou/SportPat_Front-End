import { Component, OnInit } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-maps',
  templateUrl: './home-maps.component.html',
  styleUrls: ['./home-maps.component.css']
})
export class HomeMapsComponent implements OnInit {

  constructor(private _translate: TranslateService) {
  }

  ngOnInit() {
    this._translate.addLangs(["en", "fr", "es"]);
    this._translate.setDefaultLang('en');
    let browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
  }

}
