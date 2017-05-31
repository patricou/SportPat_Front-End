import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { HomeModule } from "./home/home.module";
import { EvenementsModule } from './evenements/evenements.module';
import { ResultsModule } from './results/results.module';
import { MapsModule } from './maps/maps.module';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { HomeEvenementsComponent } from './evenements/home-evenements/home-evenements.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeResultsComponent } from './results/home-results/home-results.component';
import { HomeMapsComponent } from './maps/home-maps/home-maps.component';
import { CreateEvenementComponent } from './evenements/create-evenement/create-evenement.component';
import { UpdateEvenementComponent } from './evenements/update-evenement/update-evenement.component';
import { KeycloakService } from './keycloak/keycloak.service';
import { KeycloakHttp } from './keycloak/keycloak.http';
import { MembersService } from './members/members.service';
import { FileService } from './file/file.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
	return new TranslateHttpLoader(http);
}

// firebase config
export const environment = {
	production: false,
	firebase: {
		apiKey: "AIzaSyBJFAKMyDO_lmqBYUwW6CWjBIMTHyFGZKc",
		authDomain: "sportpat-5e155.firebaseapp.com",
		databaseURL: "https://sportpat-5e155.firebaseio.com",
		projectId: "sportpat-5e155",
		storageBucket: "sportpat-5e155.appspot.com",
		messagingSenderId: "193416492629"
	}
};

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		HomeModule,
		EvenementsModule,
		ResultsModule,
		MapsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [Http]
			}
		}),
		RouterModule.forRoot([
			{ path: '', component: HomePageComponent },
			{ path: 'even', component: HomeEvenementsComponent },
			{ path: 'neweven', component: CreateEvenementComponent },
			{ path: 'updeven/:id', component: UpdateEvenementComponent },
			{ path: 'results', component: HomeResultsComponent },
			{ path: 'maps', component: HomeMapsComponent },
			{ path: 'home', redirectTo: '', pathMatch: 'full' },
			{ path: '**', component: PageNotFoundComponent }
		]),
		FlexLayoutModule,
		NgbModule.forRoot(),
		AngularFireModule.initializeApp(environment.firebase, 'my-app-name'), // imports firebase/app needed for everything
		AngularFireDatabaseModule,
		AngularFireAuthModule,
	],
	providers: [
		KeycloakService,
		KeycloakHttp,
		MembersService,
		FileService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
