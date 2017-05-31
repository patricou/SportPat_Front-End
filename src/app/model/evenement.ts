import { Member } from './member';
import { UploadedFile } from '../model/uploadedfile';

export class Evenement {

    constructor(
        public author: Member,
        public closeInscriptionDate: Date,
        public comments: string,
        public creationDate: Date,
        public endEventDate: Date,
        public beginEventDate: Date,
        public evenementName: string,
        public id: string,
        public map: string,
        public members: Member[],
        public openInscriptionDate: Date,
        public status: string,
        public type: string,
        public fileUploadeds: UploadedFile[],
        public startHour: string,
        public diffculty: string,
        public startLocation: string,
        public durationEstimation: string,
        public ratingPlus: number,
        public ratingMinus: number
    ) { }
}