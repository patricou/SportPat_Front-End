import { Component, OnInit  } from '@angular/core';
import { TranslateService} from '@ngx-translate/core';
import { KeycloakService} from './keycloak/keycloak.service';
import { Member } from './model/member';
import { MembersService } from './members/members.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private user:Member;

  constructor( private _translate: TranslateService, 
               private _kc: KeycloakService, 
               private _membersService: MembersService) {      
   }     

  ngOnInit() {
      this._translate.addLangs(["en", "fr","es"]);
      this._translate.setDefaultLang('en');
      let browserLang = this._translate.getBrowserLang();
      this._translate.use(browserLang.match(/en|fr|es/) ? browserLang : 'en');  
      this.getUserInfo();  
  }

  logout() {
    // this.member = undefined;
    this._kc.logout();
  }

  isAuthenticated():boolean{
    return this._kc.getAuth().authenticated;
  }

  getUserInfo(){    
    //Retrieve user info from Keycloak
    this.user = this._kc.getUserAsMember();  
    // Retrive the MLAB user (member) id from MLAB
    this._membersService.setUser(this.user);
    //this.user = this._membersService.getUser();
    // the folowing add the user.id and return it through an Observanle
    this._membersService.getUserId().subscribe(member =>  {
                                                            this.user.id = member.id;                                                           
                                                            // reset the user in the service ( with id ) otherwyse it is not present ( which is strange )
                                                            this._membersService.setUser(this.user);
                                                          },
                                                            err => alert("Error when retieving MLB user id")                              
                                                          );    
    }


}
