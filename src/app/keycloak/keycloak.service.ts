import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Member } from '../model/member';

declare var Keycloak: any;

@Injectable()
export class KeycloakService {
  static auth: any = {};

  static init(): Promise<any> {
    const keycloakAuth: any = new Keycloak({
      "url": environment.keykloakBaseUrl,
      "realm": 'pat-realm',
      "clientId": 'tutorial-frontend',
      "auth-server-url": "/auth",
      "ssl-required": "none",
      "resource": "tutorial-frontend",
      "public-client": true,
      "use-resource-role-mappings": true
    });

    KeycloakService.auth.loggedIn = false;

    return new Promise((resolve, reject) => {
      keycloakAuth.init({ onLoad: 'login-required' })
        .success(() => {
          KeycloakService.auth.loggedIn = true;
          KeycloakService.auth.authz = keycloakAuth;
          //console.log ("document.baseURI :" + document.baseURI );
          //console.log ("|----------->  keycloakAuth :" + JSON.stringify(keycloakAuth) );
          KeycloakService.auth.logoutUrl =
            keycloakAuth.authServerUrl +
            '/realms/pat-realm/protocol/openid-connect/logout?redirect_uri='
            + document.baseURI;
          resolve();
        })
        .error(() => {
          reject();
        });
    });
  }

  logout() {
    console.log('*** LOGOUT');
    KeycloakService.auth.authz.logout();
    KeycloakService.auth.loggedIn = false;
    //KeycloakService.auth.authz = null;

    window.location.href = KeycloakService.auth.logoutUrl;
  }

  getToken(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      if (KeycloakService.auth.authz.token) {
        KeycloakService.auth.authz
          .updateToken(5)
          .success(() => {
            resolve(<string>KeycloakService.auth.authz.token);
          })
          .error(() => {
            console.log('Failed to refresh token');
            window.location.href = "https://182-193-28-81.ftth.cust.kwaoo.net:8000";
          });
      } else {
        reject('Not loggen in');
      }
    });
  }

  getAuth(): any {
    return KeycloakService.auth.authz;
  }

  getUserAsMember(): Member {
    let user = KeycloakService.auth.authz;
    // id is managed by mongodb
    let member: Member = new Member("",
      user.tokenParsed.email,
      user.tokenParsed.given_name,
      user.tokenParsed.family_name,
      user.tokenParsed.preferred_username,
      user.tokenParsed.realm_access.roles,
      user.subject
    );
    return member;

  }
}