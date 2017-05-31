import { Injectable } from '@angular/core';
import { Http, Headers, Response, ResponseContentType } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { environment } from '../../environments/environment';
import { KeycloakService } from '../keycloak/keycloak.service';


@Injectable()
export class FileService {

    private API_URL: string = environment.API_URL;

    constructor(private _http: Http, private _keycloakService: KeycloakService) {
    }
    // Get the token for Keycloak Security
    getHeaderWithToken(): Observable<Headers> {
        let tokenPromise: Promise<string> = this._keycloakService.getToken();
        let tokenObservable: Observable<string> = Observable.fromPromise(tokenPromise);

        return tokenObservable.map(token => {
            return new Headers({
                'Author': 'Zeus',
                'Authorization': 'Bearer ' + token

            })
        })
    }
    // GET file    
    getFile(fileId: string): Observable<any> {
        return this.getHeaderWithToken().concatMap(headers =>
            this._http.get(this.API_URL + "file/" + fileId, { headers: headers, 'responseType': ResponseContentType.ArrayBuffer })
        )
    }
}
