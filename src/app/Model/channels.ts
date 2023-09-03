import { Users } from './users';

export interface Channels {
  channelId: string;
  channelName: string;
  description: string;
  locked: number;
  creationDate: Date;
  user: Users;
}