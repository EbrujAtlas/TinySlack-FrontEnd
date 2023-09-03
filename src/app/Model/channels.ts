import { Users } from './users';

export interface Channels {
  channelId: string;
  channelName: string;
  description: string;
  protection: number;
  creationDate: Date;
  user: Users;
}