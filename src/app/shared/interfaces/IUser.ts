import { IBase } from './IBase';

export interface IUser extends IBase {
  email: string;
  eventIds:[];
  followerIds:[];
  followingIds:[];
  imgUrl:string;
  uid:string;
}