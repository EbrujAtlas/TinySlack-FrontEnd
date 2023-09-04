import { Channel } from './channel';
import { User } from './user';

export interface Message {
  messageId: string;
  messageContent: string;
  messageDate: Date;
  channel: Channel;
  user: User;
}
