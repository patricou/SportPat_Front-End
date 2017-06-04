import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IMyOptions, IMyDateModel } from 'ngx-mydatepicker';
import { Member } from '../../model/member';
import { Evenement } from '../../model/evenement';
import { MembersService } from '../../services/members.service';
import { EvenementsService } from '../../services/evenements.service';

@Component({
	selector: 'app-create-evenement',
	templateUrl: './create-evenement.component.html',
	styleUrls: ['./create-evenement.component.css']
})
export class CreateEvenementComponent implements OnInit {

	private user: Member;
	public evenement: Evenement;
	//private today: Date = new Date();
	private myOptions: IMyOptions = {
		// other options...
		dateFormat: 'dd mmm yyyy',
		alignSelectorRight: false,
		markCurrentDay: true,
		//openSelectorTopOfInput:true,
		disableUntil: {
			year: new Date().getFullYear(),
			month: new Date().getMonth() + 1,
			day: new Date().getDate() - 1
		},
		showWeekNumbers: true
	};
	// Initialized to specific date to run with ngx-mydatepicker
	private author: string;
	private beginEventDate: Object;
	private openInscriptionDate: Object;

	constructor(private _evenementsService: EvenementsService,
		private _router: Router,
		private _memberService: MembersService) {
	};

	ngOnInit() {

		this.user = this._memberService.getUser();

		// init new event fields
		this.evenement = new Evenement(this.user, new Date(), "", new Date(), new Date(), new Date(), "", "", "", [], new Date(), "Open", "", [], "", "", "", "", 0, 0);
		this.author = this.evenement.author.firstName + " " + this.evenement.author.lastName;

		/*this.beginEventDate = { date: { 
										year: this.evenement.beginEventDate.getFullYear() , 
										month: this.evenement.beginEventDate.getMonth() + 1 ,
										day: this.evenement.beginEventDate.getDate() } 
									  };*/
		this.openInscriptionDate = {
			date: {
				year: this.evenement.openInscriptionDate.getFullYear(),
				month: this.evenement.openInscriptionDate.getMonth() + 1,
				day: this.evenement.openInscriptionDate.getDate()
			}
		};

	};
	// change color for select placeholder 
	private typeColor: string = "#dcdcdc";
	private diffColor: string = "#dcdcdc";
	typeChange() {
		this.typeColor = "rgb(70,74,76)";
	}
	diffChange() {
		this.diffColor = "rgb(70,74,76)";
	}

	saveEvenement(fromform: any, isValid: boolean) {
		// this has to be done has the input field type of ngx-mydatepicker is not date but text.
		this.evenement.beginEventDate = new Date(fromform.beginEventDate.date.year, fromform.beginEventDate.date.month - 1, fromform.beginEventDate.date.day);
		this.evenement.endEventDate = new Date(fromform.endEventDate.date.year, fromform.endEventDate.date.month - 1, fromform.endEventDate.date.day);
		this.evenement.openInscriptionDate = new Date(fromform.openInscriptionDate.date.year, fromform.openInscriptionDate.date.month - 1, fromform.openInscriptionDate.date.day);
		this.evenement.closeInscriptionDate = new Date(fromform.closeInscriptionDate.date.year, fromform.closeInscriptionDate.date.month - 1, fromform.closeInscriptionDate.date.day);
		// note  : it is perhaps bad but  fields eventname, map and comment are passed through 2 ways binding.    
		//console.log("Result : "+ JSON.stringify(this.evenement) + " " + isValid);
		if (this.user.id == "") { alert("Not possible to save the event as the user.id is null, please logout/login") }
		else {
			this._evenementsService.postEvenement(this.evenement).subscribe(res => this._router.navigate(['even']), err => alert("Error when creating the Event : " + err));
		}
	};

	// optional date changed callback
	onDateChanged(event: IMyDateModel): void {
		// date selected
		console.log(event);
	};

}
