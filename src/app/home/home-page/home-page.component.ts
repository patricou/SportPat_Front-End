import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-home-page',
	templateUrl: './home-page.component.html',
	styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

	constructor(private _translate: TranslateService) {
	}

	ngOnInit() {
		this._translate.addLangs(["en", "fr", "es"]);
		this._translate.setDefaultLang('en');
		let browserLang = this._translate.getBrowserLang();
		this._translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
	}

}
