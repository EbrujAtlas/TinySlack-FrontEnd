import { User } from './user';

export interface Channel {
  channelId: string;
  channelName: string;
  channelDescription: string;
  locked: number;
  creationDate: Date;
  user: User;
}