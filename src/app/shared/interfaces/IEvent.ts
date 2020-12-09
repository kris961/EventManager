import { IBase } from './IBase';

export interface IEvent extends IBase {
    commentIds: [];
    creatorId: string;
    creatorName: string;
    date: string;
    details: string;
    guestIds: [];
    imgURL: string;
    location: string;
    name: string;
}