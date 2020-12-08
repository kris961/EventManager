import { IBase } from './IBase';

export interface IUser extends IBase {
  email: string;
  username: string;
  password: string;
}