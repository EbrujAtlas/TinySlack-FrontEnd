import { Channels } from './channels';
import { Users } from './users';

export interface Messages {
  messageId: string;
  message: string;
  messageDate: Date;
  channel: Channels;
  user: Users;
}