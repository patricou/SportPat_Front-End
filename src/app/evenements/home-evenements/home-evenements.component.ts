import { Component, OnInit, HostListener, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { EvenementsService } from '../evenements.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';

import { Evenement } from '../../model/evenement';
import { MembersService } from '../../members/members.service';
import { Member } from '../../model/member';
import { Router } from '@angular/router';
import { WindowRefService } from '../../window/window-ref.service';
import { FileService } from '../../file/file.service';
import { Headers } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

export enum KEY_CODE {
	RIGHT_ARROW = 39,
	LEFT_ARROW = 37
}

@Component({
	selector: 'home-evenements',
	templateUrl: './home-evenements.component.html',
	styleUrls: ['./home-evenements.component.css']
})
export class HomeEvenementsComponent implements OnInit, AfterViewInit {

	private evenements: Evenement[];
	private user: Member;
	private totalElements: number;
	private totalPages: number;
	private pageNumber: number = 0;
	private elementsByPage: number = 3;
	private pages: number[];
	@ViewChild('searchterm')
	private searchterm: ElementRef;
	private dataFIlter: string = "";

	constructor(private _evenementsService: EvenementsService,
		private _memberService: MembersService,
		private _fileService: FileService,
		private _router: Router) {
	}

	ngOnInit() {
		this.getEvents("");
		this.user = this._memberService.getUser();
	}

	ngAfterViewInit() {
		// used to not have to press enter when filter
		const eventObservable = Observable
			.fromEvent(this.searchterm.nativeElement, 'input')
			// .do(data => console.log(data))
			.debounceTime(700);

		eventObservable.subscribe(
			((data: any) => {
				this.pageNumber = 0;
				this.dataFIlter = data.target.value;
				this.getEvents(this.dataFIlter);
			}),
			((err: any) => console.error(err)),
			() => console.log('complete')
		)

	}
	// Get the evenements list with pagination
	private getEvents(data: any) {
		let searchString: string = "*";
		if (data !== "")
			searchString = data == "" ? "*" : data;
		this._evenementsService
			.getEvents(searchString, this.pageNumber, this.elementsByPage)
			.subscribe(res => {
				this.evenements = res.content;
				this.totalElements = res.totalElements;
				this.totalPages = res.totalPages;
				this.pageNumber = res.number;
				this.pages = Array.from(Array(this.totalPages), (x, i) => i);
			},
			err => alert("Error when getting Events " + err)
			);

	};

	private addMemberInEvent(evenement: Evenement) {
		//console.log("addMemberInEvent " + JSON.stringify(evenement));
		// put the user logged in the venemen as member
		evenement.members.push(this.user);
		// save the evenement ( does an Update )
		this._evenementsService.putEvenement(evenement).subscribe(
			res => // console.log("I participe return ok " ),
				err => alert("Error when deleting participant " + err));
	}

	private delMemberInEvent(evenement: Evenement) {
		//console.log("delMemberInEvent " + JSON.stringify(evenement));
		// put the user logged in the venemen as member    
		let members: Member[] = evenement.members;
		// remove the member
		evenement.members = members.filter(memb => !(memb.id == this.user.id));
		// save the evenement ( does an Update )
		this._evenementsService.putEvenement(evenement).subscribe(
			res => // console.log("I don't participe in evenement ok "),
				err => alert("Error when deleting participant " + err));
	}

	private delEvent(evenement: Evenement) {
		this._evenementsService.delEvenement(evenement.id)
			.subscribe(
			res => {  //  update evenements for screen update			
				this.getEvents(this.dataFIlter);
			},
			err => {
				console.log("Del evenement error : " + err);
				alert("Issue when deleting the event : " + err);
			}
			);
	}

	private updEvent(evenement: Evenement) {
		this._evenementsService.putEvenement(evenement)
			.subscribe(resp => // console.log("Update Status OK "),
				err => alert("Update Status Error : " + err));
	}

	private updateFileUploadedInEvent(evenement: Evenement) {
		this._evenementsService.put4FileEvenement(evenement)
			.subscribe(resp => // console.log("Delete file OK "),
				err => alert("Delete File Error : " + err));
	}
	// Pagination functions
	private changePage(page: number) {
		this.pageNumber = page;
		this.getEvents(this.dataFIlter);
	}
	private changePreviousPage() {
		if (this.pageNumber > 0) {
			this.pageNumber = this.pageNumber - 1;
			this.getEvents(this.dataFIlter);
		}
	}
	private changeNextPage() {
		if (this.pageNumber < this.totalPages - 1) {
			this.pageNumber = this.pageNumber + 1;
			this.getEvents(this.dataFIlter);
		}
	}
	private changeFiltre() {
		this.pageNumber = 0;
		this.getEvents(this.dataFIlter);
	}
	private clearFilter() {
		this.dataFIlter = "";
		this.changeFiltre();
	}
	// Allow to use arrow for pagination
	@HostListener('window:keyup', ['$event'])
	keyEvent(event: KeyboardEvent) {
		if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
			this.changeNextPage();
		}
		if (event.keyCode === KEY_CODE.LEFT_ARROW) {
			this.changePreviousPage();
		}
	}
}
