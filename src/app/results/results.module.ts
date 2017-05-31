import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeResultsComponent } from './home-results/home-results.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { Http } from '@angular/http';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule, 
    FormsModule , 
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
    })
  ],
  declarations: [HomeResultsComponent],
  exports:[]
})
export class ResultsModule { }
