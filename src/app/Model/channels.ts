import { Users } from './users';

export interface Channels {
  channelId: string;
  channelName: string;
  channelDescription: string;
  locked: number;
  creationDate: Date;
  user: Users;
}