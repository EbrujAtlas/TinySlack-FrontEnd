import { Users } from './users';

export interface Channels {
  channelId: string;
  channelName: string;
  description: string;
  protection: number;
  creationDate: Date;
  user: Users;
}

export const channelInt: Channels = {
  channelId: '',
  channelName: '',
  description: '',
  protection: 0,
  creationDate: new Date(2000 - 10 - 10),
  user: {
    userId: '',
    password: '',
    userMail: '',
    userName: '',
  },
};