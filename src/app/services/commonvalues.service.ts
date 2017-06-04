import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CommonvaluesService {

    private pageNumber: number = 0;
    private dataFilter: string = "";
    private elementsByPage: number = 3;
    private lang: string;

    constructor(private _translate: TranslateService) {
        // set the langage by the browser langage                
        let browserLang = this._translate.getBrowserLang();
        //this._translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');
        this.lang = browserLang.match(/en|fr|es/) ? browserLang : 'en';
        //console.info("Value of lang in Constructor service commonValue : " + JSON.stringify(this.lang));
    };

    setPageNumber(pageNumber: number) {
        this.pageNumber = pageNumber;
    }
    getPageNumber(): number {
        return this.pageNumber;
    }

    setDataFilter(dataFilter: string) {
        this.dataFilter = dataFilter;
    }

    getDataFilter(): string {
        return this.dataFilter;
    }

    setElementsByPage(elementsByPage: number) {
        this.elementsByPage = elementsByPage;
    }

    getElementsByPage(): number {
        return this.elementsByPage;
    }

    setLang(lang: string) {
        this.lang = lang;
    };

    getLang(): string {
        return this.lang;
    };

}
