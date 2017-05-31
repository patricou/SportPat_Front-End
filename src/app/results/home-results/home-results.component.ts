// In fact this Component is for the firebase Global Chat
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Member } from '../../model/member';
import { MembersService } from '../../members/members.service';

@Component({
  selector: 'app-home-results',
  templateUrl: './home-results.component.html',
  styleUrls: ['./home-results.component.css']
})
export class HomeResultsComponent implements OnInit {

  private items: FirebaseListObservable<any[]>;
  private msgVal: string = '';
  private user: Member;

  constructor(public af: AngularFireDatabase,
    private _memberService: MembersService) {
    this.items = af.list('/globalMessages', {
      query: {
        limitToLast: 75,
        orderByChild: 'priority'
      }
    });
  }

  Send(desc: string) {
    this.items.push({
      'message': desc,
      'date': firebase.database.ServerValue.TIMESTAMP,
      'user': {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        userName: this.user.userName
      },
      'priority': 0 - Date.now()
    });
    this.msgVal = '';
  }

  ngOnInit() {
    this.user = this._memberService.getUser();
  }

  deleteMessage(item) {
    this.items.remove(item.$key);
  }
}
