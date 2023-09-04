import { User } from './user';

export interface Channel {
  channelId: string;
  channelName: string;
  description: string;
  protection: number;
  creationDate: Date;
  user: User;
}
